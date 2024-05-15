/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { ICategory } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";
interface IHookCategoryProps {
  fetchCategories: () => Promise<ICategory[]>;
}
const useCategory = create<IHookCategoryProps>((_set) => ({
  fetchCategories: async () => {
    try {
      const response = await axios.get(myApi.url("categories"));
      if (response.status === 200 && response.data.status) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
}));
export default useCategory;
