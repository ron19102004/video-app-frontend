import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IVideo } from "../../../../hooks/type";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import ForEach from "../../../../libs/utils/foreach";
import { CardVideo } from "../../../../components/videos";

const UserProfilePlaylistPage: React.FC = () => {
  const { uid } = useParams();
  const { fetchVideosByUploaderId } = useVideoClient();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const init = async () => {
    const videosFetch = await fetchVideosByUploaderId(uid);
    setVideos(videosFetch);
  };
  useEffect(() => {
    if (uid !== undefined) {
      init();
    }
  }, [uid]);
  return (
    <Fragment>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <ForEach
          list={videos}
          render={(_index: number, item: IVideo) => {
            return <CardVideo video={item} />;
          }}
        />
      </ul>
    </Fragment>
  );
};

export default UserProfilePlaylistPage;
