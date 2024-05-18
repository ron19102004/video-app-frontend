import React, { Fragment, useContext } from "react";
import { IVideo } from "../../hooks/type";
import { ClassValue } from "clsx";
import { Image } from "../ui";
import cn from "../../libs/utils/cn";
import { Link } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { AuthContext } from "../../contexts/auth.context";

interface ICardVideoProps {
  video: IVideo;
  className?: ClassValue;
  imageClassName?: ClassValue;
  addPlaylist?: (video: IVideo) => void;
}
const CardVideo: React.FC<ICardVideoProps> = ({
  video,
  className,
  imageClassName,
  addPlaylist,
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <div className={` w-full cursor-pointer ${className}`}>
        <Link
          to={`/video/${video.uploader.id}/${video.slug}`}
          className="rounded-xl pb-2"
        >
          <Image
            src={video.image}
            alt={video.name}
            className={cn(
              "w-full h-44 md:h-48 lg:h-40 object-cover rounded-xl",
              imageClassName
            )}
          />
        </Link>
        <div className="flex flex-row justify-between items-start pt-2">
          <Link
            to={"/user/" + video.uploader.id}
            className="flex flex-row justify-start items-start"
          >
            <div className="w-12 flex flex-col justify-center items-center">
              <Image
                src={video.uploader.imageURL}
                alt={video.uploader.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-ellipsis line-clamp-2 font-bold">
                {video.name}
              </h1>
              <h3 className="text-ellipsis line-clamp-1">
                {video.uploader.fullName}
              </h3>
            </div>
          </Link>
          <div>
            <Popover>
              <PopoverTrigger>
                <button className="text-2xl">
                  <IoMdMore />
                </button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent
                  style={{
                    border: 0,
                  }}
                >
                  <section className="bg-bg-color text-white ring-2 ring-bg-container-color p-2 rounded">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <ul className="w-full pt-5">
                      {isAuthenticated && (
                        <Fragment>
                          <button
                            className="bg-bg-container-color w-full text-start px-2 py-1 rounded-md"
                            onClick={() => {
                              addPlaylist(video);
                            }}
                          >
                            Add to playlist
                          </button>
                        </Fragment>
                      )}
                    </ul>
                  </section>
                </PopoverContent>
              </Portal>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardVideo;
