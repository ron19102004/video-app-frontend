import React from "react";
import { IVideo } from "../../hooks/type";
import { ClassValue } from "clsx";
import { Image } from "../ui";
import cn from "../../libs/utils/cn";
import { Link } from "react-router-dom";

interface ICardVideoProps {
  video: IVideo;
  className?: ClassValue;
  imageClassName?: ClassValue;
}
const CardVideo: React.FC<ICardVideoProps> = ({
  video,
  className,
  imageClassName,
}) => {
  return (
    <Link
      to={`/video/${video.uploader.id}/${video.slug}`}
      className={` w-full cursor-pointer ${className}`}
    >
      <div className="rounded-xl pb-2">
        <Image
          src={video.image}
          alt={video.name}
          className={cn(
            "w-full h-44 md:h-48 lg:h-40 object-cover rounded-xl",
            imageClassName
          )}
        />
      </div>
      <div className="flex flex-row justify-start items-start">
        <div className="w-12 flex flex-col justify-center items-center">
          <Image
            src={video.uploader.imageURL}
            alt={video.uploader.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-ellipsis line-clamp-2 font-bold">{video.name}</h1>
          <h3 className="text-ellipsis line-clamp-1">
            {video.uploader.fullName}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CardVideo;
