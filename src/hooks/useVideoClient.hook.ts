import Cookies from "js-cookie";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { IVideo } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";

export interface IHookVideoClientProps {
  isFetching: boolean;
  fetchVideos: (pageNumber: number) => Promise<Array<IVideo>>;
  fetchVideoBySlug: (slug: string | undefined) => Promise<IVideo | null>;
  fetchVideosByUploaderId: (
    uploaderId: number | string | undefined
  ) => Promise<IVideo[]>;
  fetchVideosByPublicPlaylistId: (id: number | undefined) => Promise<IVideo[]>;
  fetchMyVideoByPlaylistId: (playlistId: number) => Promise<IVideo[]>;
  fetchMyVideos: () => Promise<IVideo[]>;
}
const useVideoClient = create<IHookVideoClientProps>((_set) => ({
  isFetching: false,
  fetchVideos: async (pageNumber: number = 0) => {
    try {
      const response = await axios.get(myApi.url(`videos?page=${pageNumber}`));
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
  fetchVideoBySlug: async (slug: string | undefined) => {
    if (!slug) {
      return null;
    }
    try {
      const response = await axios.get(myApi.url(`videos/item/${slug}`));
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  fetchVideosByUploaderId: async (uploaderId: number | string | undefined) => {
    if (!uploaderId) {
      return [];
    }
    try {
      const response = await axios.get(
        myApi.url(`videos?uploader_id=${uploaderId}`)
      );
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
  fetchVideosByPublicPlaylistId: async (id: number | undefined) => {
    if (!id) {
      return [];
    }
    try {
      const response = await axios.get(
        myApi.url(`playlists/public/videos?playlistId=${id}`)
      );
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
  fetchMyVideoByPlaylistId: async (playlistId: number) => {
    try {
      const token = Cookies.get("access-token");
      const response = await axios.get(
        myApi.url(`playlists/videos?playlistId=${playlistId}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
  fetchMyVideos: async () => {
    try {
      const token = Cookies.get("access-token");
      const response = await axios.get(myApi.url(`videos/my-videos`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
}));
export default useVideoClient;
