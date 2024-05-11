import { create } from "zustand";
import { IVideo } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";

export interface IHookVideoClientProps {
  videos: Array<IVideo>;
  isFetching: boolean;
  fetchVideos: (pageNumber: number) => Promise<void>;
}
const useVideoClient = create<IHookVideoClientProps>((set) => ({
  videos: [],
  isFetching: false,
  fetchVideos: async (pageNumber: number = 0) => {
    set((state) => ({
      ...state,
      isFetching: true,
    }));
    try {
      const response = await axios.get(myApi.url(`videos?page=${pageNumber}`));
      if (response.status === 200 && response.data.status) {
        const data = response.data.data;
        set((state) => ({
          ...state,
          videos: data,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      set((state) => ({
        ...state,
        isFetching: false,
      }));
    }
  },
}));
export default useVideoClient;
