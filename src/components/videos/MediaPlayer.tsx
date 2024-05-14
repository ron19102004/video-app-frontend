import React from "react";
import { IVideo } from "../../hooks/type";

interface IMediaPlayerProps {
  video: IVideo | null;
}
const MediaPlayer: React.FC<IMediaPlayerProps> = ({ video }) => {
  return (
    <section className="space-y-3">
      <video
        src={video?.src}
        controls
        className="rounded-xl w-full h-[210px] md:h-[418px] xl:h-[570px] xl:w-[1020px] 2xl:w-full bg-black"
      ></video>
      <div className="bg-bg-container-color py-4 px-2 rounded-xl">
        <h1 className="font-bold lg:text-xl">{video?.name ?? "Unknown"}</h1>
        <h4 className="text-primary-content-color">
          {video?.tag ? `@${video?.tag}` : ""}
        </h4>
      </div>
    </section>
  );
};

export default MediaPlayer;
