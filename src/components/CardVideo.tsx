import React from "react";
import { IVideo } from "../hooks/type";

interface ICardVideoProps {
  video: IVideo;
  onClick: () => void;
  className?: string;
}
const CardVideo: React.FC<ICardVideoProps> = ({
  video,
  onClick,
  className,
}) => {
  return (
    <div onClick={onClick} className={`${className} min-w-full cursor-pointer`}>
      <div className="rounded-xl pb-2">
        <img
          src={video.image}
          alt={video.name}
          className="min-w-full h-48 object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-row justify-start items-start">
        <div className="w-12 flex flex-col justify-center items-center">
          <img
            src={video.uploader.imageURL}
            alt={video.uploader.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-ellipsis line-clamp-2 font-bold">{video.name}</h1>
          <h3 className="text-ellipsis line-clamp-1">{video.uploader.fullName}</h3>
        </div>
      </div>
    </div>
  );
};

export default CardVideo;
