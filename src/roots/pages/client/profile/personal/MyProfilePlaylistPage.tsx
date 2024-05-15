import React, { useEffect, useState } from "react";
import usePlaylist from "../../../../../hooks/usePlaylist.hook";
import { IPlaylist } from "../../../../../hooks/type";
import ForEach from "../../../../../libs/utils/foreach";

const MyProfilePlaylistPage: React.FC = () => {
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);
  const { fetchMyPlaylist } = usePlaylist();
  const init = async () => {
    const pl = await fetchMyPlaylist();
    console.log(pl);
    setPlaylist(pl);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <ul>
        <ForEach
          list={playlist}
          render={(index: number, item: IPlaylist) => {
            return <li key={index}>{item.name}</li>;
          }}
        />
      </ul>
    </div>
  );
};

export default MyProfilePlaylistPage;
