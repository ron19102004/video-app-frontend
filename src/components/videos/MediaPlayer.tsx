import React from "react";
import { IVideo } from "../../hooks/type";
import { Heading, Image } from "../ui";

interface IMediaPlayerProps {
  video: IVideo | null;
}
const MediaPlayer: React.FC<IMediaPlayerProps> = ({ video }) => {
  return (
    <section className="space-y-3">
      <div className="relative w-full h-[210px] md:h-[418px] xl:h-[570px] xl:w-[1020px] 2xl:w-full pt-2">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-2xl"
          style={{
            backgroundImage: `url(${video?.image || video?.src})`,
          }}
        ></div>
        <video
          src={video?.src}
          controls
          className="relative rounded-xl w-full h-full bg-black"
        ></video>
      </div>
      <div className="bg-bg-container-color py-4 px-2 rounded-xl">
        <Heading value={video?.name ?? "Unknown"} />
        <Heading
          value={video?.tag ? `@${video?.tag}` : ""}
          className="text-primary-content-color cursor-pointer"
        />
        <a
          href={`/user/${video?.uploader?.id}`}
          className="flex justify-start items-center space-x-1"
        >
          <Image
            src={video?.uploader?.imageURL}
            className="object-cover w-10 h-10 rounded-full"
          />
          <Heading value={video?.uploader?.fullName ?? "Unknown"} />
        </a>
      </div>
    </section>
  );
};

export default MediaPlayer;
