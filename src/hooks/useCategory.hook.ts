/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { ICategory } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";
import Cookies from "js-cookie";
import toast, { EToastType } from "../libs/utils/toast.util";

interface IHookCategoryProps {
  fetchCategories: () => Promise<ICategory[]>;
  create: (name: string, file: File) => Promise<void>;
  changeName: (id: number, name: string) => Promise<void>;
  changeImage: (id: number, file: File) => Promise<void>;
  delete: (id: number) => Promise<void>;
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
  create: async (name: string, file: File) => {
    try {
      const token = Cookies.get("access-token");
      const data = new FormData();
      data.append("name", name);
      data.append("file", file);
      const response = await axios.post(myApi.url("categories/new"), data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (response.data.status)
          toast({
            message: "Create category successfully!",
            type: EToastType.success,
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
  changeImage: async (id: number, file: File) => {
    try {
      const token = Cookies.get("access-token");
      const data = new FormData();
      data.append("file", file);
      const response = await axios.patch(
        myApi.url(`categories/${id}/update-image`),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  changeName: async (id: number, name: string) => {
    try {
      const token = Cookies.get("access-token");
      const data = new FormData();
      data.append("name", name);
      const response = await axios.patch(
        myApi.url(`categories/${id}/update-image`),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id: number) => {
    try {
      const token = Cookies.get("access-token");
      const response = await axios.delete(myApi.url(`categories/${id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (response.data.status)
          toast({
            message: "Delete category successfully!",
            type: EToastType.success,
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}));
export default useCategory;
