/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { IPlaylist } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";
import Cookies from "js-cookie";
interface IHookPlaylistProps {
  fetchMyPlaylist: () => Promise<IPlaylist[]>;
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
}));
export default usePlaylist;
