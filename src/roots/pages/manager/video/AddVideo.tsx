import React, { useState } from "react";
import NewInformationVideo from "./forms/NewInformationVideo";
import AddPosterVideo from "./forms/AddPosterVideo";
import useVideoManager, {
  IDataNewInformation,
} from "../../../../hooks/useVideoManager.hook";
import VideoSourceUpload from "./forms/VideoSourceUpload";
import toast, { EToastType } from "../../../../libs/utils/toast.util";

const AddVideo: React.FC = () => {
  const { createInfoVideo, uploadPoster, uploadSrcVideo } = useVideoManager();
  const [image, setImage] = useState<File | null>(null);
  const [info, setInfo] = useState<IDataNewInformation | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const onFinishCreateVideo = async () => {
    if (image !== null && video !== null && info !== null) {
      const videoId = await createInfoVideo(info);
      if (videoId) {
        await uploadPoster(videoId, image);
        await uploadSrcVideo(videoId, video);
      }
      window.location.reload()
      return;
    }
    if (image === null) {
      toast({ type: EToastType.error, message: "Missing a poster" });
    }
    if (video === null) {
      toast({ type: EToastType.error, message: "Missing a video" });
    }
    if (info === null) {
      toast({ type: EToastType.error, message: "Missing information" });
    }
  };
  return (
    <div>
      <div className="flex justify-end items-center">
        <button
          className="bg-primary-content-color px-4 py-2 rounded-lg"
          onClick={onFinishCreateVideo}
        >
          Create
        </button>
      </div>
      <div className="md:flex md:flex-row md:items-start gap-3">
        <NewInformationVideo
          className="md:basis-1/2"
          onChange={(data: IDataNewInformation) => {
            setInfo(data);
          }}
        />
        <div className="md:flex-1 ">
          <AddPosterVideo
            className=""
            onChange={(file: File | null) => {
              setImage(file);
            }}
          />
          <VideoSourceUpload
            className=""
            onChange={(file: File | null) => {
              setVideo(file);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
