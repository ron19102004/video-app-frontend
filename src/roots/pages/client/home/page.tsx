import React, {
  Fragment,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import ForEach from "../../../../libs/utils/foreach";
import { ICategory, IPlaylist, IVideo } from "../../../../hooks/type";
import useCategory from "../../../../hooks/useCategory.hook";
import { Link } from "react-router-dom";
import cn from "../../../../libs/utils/cn";
import usePlaylist from "../../../../hooks/usePlaylist.hook";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Heading, Image } from "../../../../components/ui";
const CardVideo = lazy(() => import("../../../../components/videos/CardVideo"));

const HomePage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [videoMoreSelected, setVideoMoreSelected] = useState<IVideo | null>(
    null
  );

  const { fetchVideos } = useVideoClient();
  const { fetchCategories } = useCategory();
  const { fetchMyPlaylist, addVideo } = usePlaylist();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [myPlaylists, setMyPlaylists] = useState<IPlaylist[]>([]);

  const init = async () => {
    const vids = await fetchVideos(0);
    const cates = await fetchCategories();
    const pls = await fetchMyPlaylist();
    setVideos(vids);
    setCategories(cates);
    setMyPlaylists(pls);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Fragment>
      <div>
        <ul className="scroll-hidden flex flex-row max-w-full overflow-x-auto space-x-2 pb-2">
          <ForEach
            list={categories}
            render={(_index: number, item: ICategory) => {
              return (
                <Link
                  to={`/video/search?category_id=${item.id}`}
                  className={cn("bg-bg-container-color px-4 py-1 rounded-xl")}
                >
                  {item.name}
                </Link>
              );
            }}
          />
        </ul>
        <ul className="grid gap-6 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ForEach
            list={videos}
            render={(_index: number, item: IVideo) => {
              return (
                <Suspense>
                  <CardVideo
                    video={item}
                    imageClassName="lg:h-52"
                    addPlaylist={(video: IVideo) => {
                      setVideoMoreSelected(video);
                      onOpen();
                    }}
                  />
                </Suspense>
              );
            }}
          />
        </ul>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <section className="bg-bg-color text-white ring-2 ring-bg-container-color rounded-md">
            <ModalHeader>Add to playlist</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ul className="flex justify-start items-center gap-3  overflow-x-scroll playlist-scroll pb-5">
                {myPlaylists && (
                  <ForEach
                    list={myPlaylists}
                    render={(_: number, item: IPlaylist) => {
                      return (
                        <li
                          key={item.id}
                          className="w-52 cursor-pointer hover:text-primary-content-color"
                          onClick={() => {
                            if (videoMoreSelected) {
                              addVideo({
                                playlistId: item.id,
                                videoId: videoMoreSelected.id,
                              }).then(() => {
                                setVideoMoreSelected(null);
                                onClose();
                              });
                            }
                          }}
                        >
                          <div>
                            <Image
                              src={item.image}
                              className="w-52 h-40 rounded-xl"
                            />
                          </div>
                          <Heading
                            value={item.name}
                            className="text-ellipsis line-clamp-2"
                          />
                        </li>
                      );
                    }}
                  />
                )}
              </ul>
            </ModalBody>
          </section>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default HomePage;
