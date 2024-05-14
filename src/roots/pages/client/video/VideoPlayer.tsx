import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import { IVideo } from "../../../../hooks/type";
import { CardVideo, MediaPlayer } from "../../../../components/videos";
import ForEach from "../../../../libs/utils/foreach";

const VideoPlayerPage: React.FC = () => {
  const { uploaderId, slug } = useParams();
  const { fetchVideoBySlug, fetchVideosByUploaderId } = useVideoClient();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [uploaderVideos, setUploaderVideos] = useState<IVideo[]>([]);
  const init = async () => {
    const videoFetch = await fetchVideoBySlug(slug);
    const uploaderVideosFetch = await fetchVideosByUploaderId(
      parseInt(uploaderId ?? "0")
    );
    setUploaderVideos(uploaderVideosFetch);
    setVideo(videoFetch);
  };
  useEffect(() => {
    init();
  }, [slug]);
  return (
    <section className="space-y-3">
      <div>
        <MediaPlayer video={video} />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <ForEach
          list={uploaderVideos}
          render={(_index: number, item: IVideo) => {
            return (
              <CardVideo
                video={item}
              />
            );
          }}
        />
      </ul>
    </section>
  );
};

export default VideoPlayerPage;
