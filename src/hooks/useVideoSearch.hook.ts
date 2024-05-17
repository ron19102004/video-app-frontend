import { create } from "zustand";
import { IVideo } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";

interface ISearchProps {
  name?: string | undefined;
  category_id?: number | undefined;
  country_id?: number | undefined;
}
interface IHookVideoSearchProps {
  search: (data: ISearchProps) => Promise<IVideo[]>;
}
const useVideoSearch = create<IHookVideoSearchProps>((set) => ({
  result: [],
  search: async (data: ISearchProps) => {
    try {
      let query: string[] = [];
      if (data.name) query = [...query, "name=" + data.name];
      if (data.category_id)
        query = [...query, "category_id=" + data.category_id];
      if (data.country_id) query = [...query, "country_id=" + data];
      const response = await axios.get(
        myApi.url("videos/search?" + query.join("&"))
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
export default useVideoSearch;
