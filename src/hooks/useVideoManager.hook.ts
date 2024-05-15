/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { IVideo } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";

interface IHookVideoManagerProps {
  videos: Array<IVideo>;
  fetchVideo: () => void;
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
}));
export default useVideoManager;
