/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { IVideo } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";
import Cookies from "js-cookie";
import toast, { EToastType } from "../libs/utils/toast.util";

export interface IDataNewInformation {
  categoryId: number;
  countryId: number;
  name: string;
  description: string;
  tag: string;
  release: Date;
  isVip: boolean;
  isPublic: boolean;
}
interface IHookVideoManagerProps {
  videos: Array<IVideo>;
  fetchVideo: () => void;
  createInfoVideo: (data: IDataNewInformation) => Promise<number>;
  uploadPoster: (videoId: number, file: File) => Promise<void>;
  uploadSrcVideo: (videoId: number, file: File) => Promise<void>;
}
const useVideoManager = create<IHookVideoManagerProps>((_set) => ({
  videos: [],
  fetchVideo: () => {
    axios
      .get(myApi.url("/videos"))
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createInfoVideo: async (data: IDataNewInformation) => {
    try {
      const token = Cookies.get("access-token");
      const response = await axios.post(myApi.url("videos/new-info"), data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const res = response.data;
        if (res.status) {
          toast({
            type: EToastType.success,
            message: res.message,
          });
          return res.data.id;
        } else {
          toast({
            type: EToastType.error,
            message: res.message,
          });
        }
      }
    } catch (error) {
      console.log(data);
    }
    return -1;
  },
  uploadPoster: async (videoId: number, file: File) => {
    try {
      const token = Cookies.get("access-token");
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        myApi.url("videos/upload-image/" + videoId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.status) {
          toast({
            type: EToastType.success,
            message: "Upload poster successfully!",
          });
        } else {
          toast({
            type: EToastType.error,
            message: response.data.message,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  uploadSrcVideo: async (videoId: number, file: File) => {
    try {
      const token = Cookies.get("access-token");
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        myApi.url("videos/upload-video/" + videoId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.status) {
          toast({
            type: EToastType.success,
            message: "Upload source successfully!",
          });
        } else {
          toast({
            type: EToastType.error,
            message: response.data.message,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useVideoManager;
