import React, { Fragment, useEffect, useState } from "react";
import usePlaylist from "../../../../../hooks/usePlaylist.hook";
import { IPlaylist, IVideo } from "../../../../../hooks/type";
import ForEach from "../../../../../libs/utils/foreach";
import useVideoClient from "../../../../../hooks/useVideoClient.hook";
import PlaylistContainer from "../../../../../components/playlist/PlaylistContainer";
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Heading, TextFiled } from "../../../../../components/ui";
import { Size } from "../../../../../libs/utils/type.d";
import toast, { EToastType } from "../../../../../libs/utils/toast.util";

const MyProfilePlaylistPage: React.FC = () => {
  const [newName, setNewName] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isOpenNewPlaylist, setIsOpenNewPlaylist] = useState<boolean>(false);
  const [playlistAndVideos, setPlaylistAndVideos] = useState<
    {
      playlist: IPlaylist;
      videos: IVideo[];
    }[]
  >([]);
  const { fetchMyPlaylist, createPlaylist } = usePlaylist();
  const { fetchMyVideoByPlaylistId } = useVideoClient();
  const init = async () => {
    const pls = await fetchMyPlaylist();
    if (!pls) return;
    const videosPlaylistPromises = pls.map(async (playlist: IPlaylist) => {
      const vids = await fetchMyVideoByPlaylistId(playlist.id);
      return {
        playlist: playlist,
        videos: vids,
      };
    });
    const videosPlaylist = await Promise.all(videosPlaylistPromises);
    setPlaylistAndVideos(videosPlaylist);
  };
  const newPlaylist = async () => {
    if (newName === null) {
      toast({
        type: EToastType.error,
        message: "Please enter a new name for the playlist ",
      });
      return;
    }
    await createPlaylist({
      name: newName,
      isPublic: isPublic,
    });
    setNewName(null);
    setIsOpenNewPlaylist(false);
    init();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <div>
        <Popover isOpen={isOpenNewPlaylist}>
          <PopoverTrigger>
            <button
              className="bg-primary-content-color px-2 py-1 rounded font-semibold"
              onClick={() => {
                setIsOpenNewPlaylist(true);
              }}
            >
              Create a playlist
            </button>
          </PopoverTrigger>
          <PopoverContent
            style={{
              border: 0,
            }}
          >
            <section className="bg-bg-color ring-2 ring-bg-container-color rounded">
              <PopoverArrow />
              <PopoverCloseButton
                onClick={() => {
                  setIsOpenNewPlaylist(false);
                }}
              />
              <div className="p-2 space-y-2">
                <Heading value="New a playlist" size={Size.XL} />
                <TextFiled
                  label="Playlist's name"
                  type="text"
                  value={newName ?? ""}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  inputClassName="h-10"
                />
                <div className="flex justify-start items-center space-x-2">
                  <label>Public</label>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setIsPublic(e.target.checked);
                    }}
                  />
                </div>
                <p className="text-sm text-zinc-600">
                  When you choose to make it public, everyone will have the
                  right to view your save video.
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-primary-content-color px-6 py-1 rounded-xl"
                    onClick={newPlaylist}
                  >
                    Add
                  </button>
                </div>
              </div>
            </section>
          </PopoverContent>
        </Popover>
      </div>
      <ul className="space-y-3">
        <ForEach
          list={playlistAndVideos}
          render={(
            _index: number,
            item: { playlist: IPlaylist; videos: IVideo[] }
          ) => {
            return (
              <Fragment>
                <PlaylistContainer
                  playlist={item.playlist}
                  videos={item.videos}
                />
                <hr className="" />
              </Fragment>
            );
          }}
        />
      </ul>
    </div>
  );
};

export default MyProfilePlaylistPage;
