/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { ICountry } from "./type";
import axios from "axios";
import toast, { EToastType } from "../libs/utils/toast.util";
import Cookies from "js-cookie";
import { myApi } from "../libs/utils/api.utils";

interface IHookCountryProps {
  fetchCountries: () => Promise<ICountry[]>;
  create: (name: string) => Promise<void>;
  update: (id: number, name: string) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
const useCountry = create<IHookCountryProps>((_set) => ({
  fetchCountries: async () => {
    try {
      const country = await axios.get(myApi.url("countries"));
      if (country.status === 200) {
        return country.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },
  create: async (name: string) => {
    try {
      const country = await axios.post(myApi.url("countries/new"), {
        name: name,
      });
      if (country.status === 200 && country.data.status) {
        toast({
          type: EToastType.success,
          message: "Create country successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  update: async (id: number, name: string) => {
    try {
      const token = Cookies.get("access-token");
      const country = await axios.patch(
        myApi.url("countries/" + id),
        { name: name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (country.status === 200 && country.data.status) {
        toast({
          type: EToastType.success,
          message: "Update country successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id: number) => {
    try {
      const token = Cookies.get("access-token");
      const country = await axios.delete(myApi.url("countries/" + id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (country.status === 200 && country.data.status) {
        toast({
          type: EToastType.success,
          message: "Delete country successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useCountry;
