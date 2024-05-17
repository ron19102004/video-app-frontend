import React, { useEffect, useRef, useState } from "react";
import { IVideo } from "../../hooks/type";
import { ClassValue } from "clsx";
import cn from "../../libs/utils/cn";
import { Heading, Image } from "../ui";
import { ConfirmedIcon } from "../../assets";
import { Size } from "../../libs/utils/type.d";
import { formatDuration } from ".";
import { Link, useNavigate } from "react-router-dom";
interface ICardVideoSearchProps {
  video: IVideo;
  className?: ClassValue;
}
const CardVideoSearch: React.FC<ICardVideoSearchProps> = ({
  video,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [duration, setDuration] = useState<number>(0);
  const onMouseMove = () => {
    videoRef.current?.play();
  };
  const onMouseLeave = () => {
    videoRef.current?.pause();
  };
  const loadMetaData = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 15;
    }
  }, []);
  return (
    <div
      className={cn(
        "overflow-hidden flex flex-row justify-start items-start space-x-3",
        className
      )}
    >
      <div
        className="relative cursor-pointer"
        onClick={() => {
          navigate(`/video/${video.uploader.id}/${video.slug}`);
        }}
      >
        <video
          className={cn("bg-black h-56 w-96 cursor-pointer rounded-xl")}
          src={video.src}
          muted
          ref={videoRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          poster={video.image}
          onLoadedMetadata={loadMetaData}
        ></video>
        <h1 className="absolute bottom-2 right-2 bg-bg-container-color-trans px-2 rounded-xl">
          {formatDuration(duration)}
        </h1>
      </div>
      <div className={cn("flex-1 max-w-full space-y-2 h-full")}>
        <Link to={`/video/${video.uploader.id}/${video.slug}`}>
          <Heading
            className="text-ellipsis line-clamp-3"
            value={video.name}
            size={Size.LG}
          />
        </Link>
        <div className="flex flex-row justify-start items-center gap-3">
          <Image
            src={video.uploader.imageURL}
            className="w-10 h-10 rounded-full"
          />
          <Heading value={video.uploader.fullName} />
          <Image src={ConfirmedIcon} className="w-5 h-5" />
        </div>
        <p className="text-zinc-500 text-ellipsis line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default CardVideoSearch;
