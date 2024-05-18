import React from "react";
import { IVideo } from "../../hooks/type";
import { Link } from "react-router-dom";
import { Heading, Image } from "../ui";
interface IPlaylistItemProps {
  video: IVideo;
}
const PlaylistItem: React.FC<IPlaylistItemProps> = ({ video }) => {
  return (
    <li className="w-56">
      <Link to={`/video/${video.uploader.id}/${video.slug}`}>
        <Image src={video.image} className="w-56 h-40 rounded-2xl" />
        <Heading
          value={video.name}
          className="text-sm text-ellipsis line-clamp-2"
        />
      </Link>
      <Link
        to={`/user/${video.uploader.id}`}
        className="flex items-center justify-start space-x-1"
      >
        <Image src={video.uploader.imageURL} className="w-7 h-7 rounded-full" />
        <h1 className="text-xs">{video.uploader.fullName}</h1>
      </Link>
    </li>
  );
};

export default PlaylistItem;
