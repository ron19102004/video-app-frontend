/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { IPlaylist, IVideo } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";
import Cookies from "js-cookie";
import toast, { EToastType } from "../libs/utils/toast.util";
interface IHookPlaylistProps {
  fetchMyPlaylist: () => Promise<IPlaylist[]>;
  fetchUserConfirmedPlaylist: (
    userId: number | undefined | string
  ) => Promise<IPlaylist[]>;
  createPlaylist: (data: { name: string; isPublic: boolean }) => Promise<void>;
  delete: (id: number | undefined) => Promise<void>;
  addVideo: (data: { playlistId: number; videoId: number }) => Promise<void>;
  deleteVideoByVideoPlaylistId: (videoPlaylistId: number) => Promise<void>;
}
const usePlaylist = create<IHookPlaylistProps>((set) => ({
  fetchMyPlaylist: async () => {
    try {
      const token = Cookies.get("access-token");
      if (!token) return [];
      const response = await axios.get(myApi.url("playlists/my"), {
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
  createPlaylist: async (data: { name: string; isPublic: boolean }) => {
    try {
      const token = Cookies.get("access-token");
      if (!token) {
        toast({ type: EToastType.error, message: "Access token not found" });
        return;
      }
      const response = await axios.post(myApi.url("playlists/new"), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data.status) {
        toast({ type: EToastType.success, message: response.data.message });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id: number | undefined) => {
    if (!id) {
      toast({ type: EToastType.error, message: "ID must not undefined" });
      return;
    }
    try {
      const token = Cookies.get("access-token");
      if (!token) {
        toast({ type: EToastType.error, message: "Access token not found" });
        return;
      }
      const response = await axios.delete(myApi.url("playlists?id=" + id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast({
          type: response.data.status ? EToastType.success : EToastType.error,
          message: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  addVideo: async (data: {
    playlistId: number | undefined;
    videoId: number | undefined;
  }) => {
    if (!data.playlistId || !data.videoId) {
      toast({
        type: EToastType.error,
        message: "Video ID and Playlist ID must not undefined",
      });
      return;
    }
    try {
      const token = Cookies.get("access-token");
      if (!token) {
        toast({ type: EToastType.error, message: "Access token not found" });
        return;
      }
      const formData = new FormData();
      formData.append("playlistId", data.playlistId.toString());
      formData.append("videoId", data.videoId.toString());
      const response = await axios.post(myApi.url("playlists/add"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        type: response.data.status ? EToastType.success : EToastType.error,
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteVideoByVideoPlaylistId: async (videoPlaylistId: number) => {
    if (!videoPlaylistId) {
      toast({
        type: EToastType.error,
        message: "Video Playlist ID must not undefined",
      });
      return;
    }
    try {
      const token = Cookies.get("access-token");
      if (!token) {
        toast({ type: EToastType.error, message: "Access token not found" });
        return;
      }
      const response = await axios.delete(
        myApi.url("playlists/video?videoPlaylistId=" + videoPlaylistId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast({
          type: response.data.status ? EToastType.success : EToastType.error,
          message: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserConfirmedPlaylist: async (userId: number | undefined | string) => {
    if (userId === undefined) return [];
    try {
      const response = await axios.get(
        myApi.url("playlists/user-confirmed?userId=" + userId)
      );
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
}));
export default usePlaylist;
