import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePlaylist from "../../../../hooks/usePlaylist.hook";
import { IPlaylist, IVideo } from "../../../../hooks/type";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import ForEach from "../../../../libs/utils/foreach";
import PlaylistContainer from "../../../../components/playlist/PlaylistContainer";

const UserProfilePlaylistPage: React.FC = () => {
  const { uid } = useParams();
  const { fetchUserConfirmedPlaylist } = usePlaylist();
  const { fetchVideosByPublicPlaylistId } = useVideoClient();
  const [playlistsAndVideos, setPlaylistsAndVideos] = useState<
    { playlist: IPlaylist; videos: IVideo[] }[]
  >([]);
  const init = async () => {
    const playlists = await fetchUserConfirmedPlaylist(uid);
    const playlistAndVideoPromise = playlists.map(
      async (playlist: IPlaylist) => {
        const videos = await fetchVideosByPublicPlaylistId(playlist.id);
        return { playlist, videos };
      }
    );
    const playlistAndVideos = await Promise.all(playlistAndVideoPromise);
    setPlaylistsAndVideos(playlistAndVideos);
  };
  useEffect(() => {
    if (uid !== undefined) {
      init();
    }
  }, [uid]);
  return (
    <div>
      
      <ul className="space-y-3">
        <ForEach
          list={playlistsAndVideos}
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

export default UserProfilePlaylistPage;
