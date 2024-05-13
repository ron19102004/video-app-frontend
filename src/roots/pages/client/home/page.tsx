import React, { useEffect } from "react";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import ForEach from "../../../../libs/utils/foreach";
import { IVideo } from "../../../../hooks/type";
import CardVideo from "../../../../components/videos/CardVideo";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { fetchVideos, videos } = useVideoClient();
  const navigate = useNavigate();
  useEffect(() => {
    fetchVideos(0);
  }, []);
  return (
    <div>
      <ul className="grid gap-6 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ForEach
          list={videos}
          render={(_index: number, item: IVideo) => {
            return (
              <CardVideo
                video={item}
                onClick={() => {
                  navigate(`/video/${item.slug}`);
                }}
              />
            );
          }}
        />
      </ul>
    </div>
  );
};

export default HomePage;
