import React, { useEffect } from "react";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import ForEach from "../../../../libs/utils/foreach";
import { IVideo } from "../../../../hooks/type";

const HomePage: React.FC = () => {
  const { fetchVideos, videos } = useVideoClient();
  useEffect(() => {
    fetchVideos(0);
  }, []);
  return (
    <div>
      home //sử dụng FC foreach để render dữ liệu dạng list mà không cần key
      <ForEach
        list={videos}
        render={(_index: number, item: IVideo) => {
          return <div>{item.name}</div>;
        }}
      />
    </div>
  );
};

export default HomePage;
