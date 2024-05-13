import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import { IVideo } from "../../../../hooks/type";
import { MediaPlayer } from "../../../../components/videos";

const VideoPlayer: React.FC = () => {
  const { slug } = useParams();
  const { fetchVideoBySlug } = useVideoClient();
  const [video, setVideo] = useState<IVideo | null>(null);
  const init = async () => {
    const videoFetch = await fetchVideoBySlug(slug);
    setVideo(videoFetch);
  };
  useEffect(() => {
    init();
  }, [slug]);
  return (
    <section>
      <div>
          <MediaPlayer video={video}/>
      </div>
    </section>
  );
};

export default VideoPlayer;
