import React, { Fragment, useEffect, useState } from "react";
import ForEach from "../../../../../libs/utils/foreach";
import { CardVideo } from "../../../../../components/videos";
import useVideoClient from "../../../../../hooks/useVideoClient.hook";
import { IVideo } from "../../../../../hooks/type";

const MyProfileVideoPage: React.FC = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { fetchMyVideos } = useVideoClient();
  const init = async () => {
    const vids = await fetchMyVideos();
    setVideos(vids);
  };
  useEffect(() => {
    init();
  }, []);
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

export default MyProfileVideoPage;
