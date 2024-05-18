import React, { useEffect, useState } from "react";
import useCategory from "../../../../../hooks/useCategory.hook";
import useCountry from "../../../../../hooks/useCountry.hook";
import { ICategory, ICountry } from "../../../../../hooks/type";
import { useForm } from "react-hook-form";
import {
  Heading,
  TextFiled,
  TextHighLight,
} from "../../../../../components/ui";
import cn from "../../../../../libs/utils/cn";
import ForEach from "../../../../../libs/utils/foreach";
import toast, { EToastType } from "../../../../../libs/utils/toast.util";
import { Size } from "../../../../../libs/utils/type.d";
import { ClassValue } from "clsx";
import { IDataNewInformation } from "../../../../../hooks/useVideoManager.hook";

interface IFormNewInfoVideo {
  name: string;
  description: string;
  tag: string;
  release: Date;
  isVip: boolean;
  isPublic: boolean;
}
interface INewInformationVideoProps {
  className?: ClassValue;
  onChange: (data: IDataNewInformation) => void;
}
const NewInformationVideo: React.FC<INewInformationVideoProps> = ({
  className,
  onChange,
}) => {
  const { fetchCategories } = useCategory();
  const { fetchCountries } = useCountry();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([]);

  const [countryIdSelected, setCountryIdSelected] = useState<number | null>(
    null
  );
  const [cateIdSelected, setCateIdSelected] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormNewInfoVideo>();

  const init = async () => {
    const cates = await fetchCategories();
    const cons = await fetchCountries();
    setCategories(cates);
    setCountries(cons);
  };
  const onSubmit = async (data: IFormNewInfoVideo) => {
    if (cateIdSelected === null) {
      toast({ type: EToastType.error, message: "Please select a category" });
      return;
    }
    if (countryIdSelected === null) {
      toast({ type: EToastType.error, message: "Please select a country" });
      return;
    }
    const info: IDataNewInformation = {
      ...data,
      countryId: countryIdSelected,
      categoryId: cateIdSelected,
    };
    onChange(info);
    toast({ type: EToastType.success, message: "Info saved !" });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className={cn("w-full", className)}>
      <Heading value="New video information" size={Size.XL} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <label>Select a category</label>
          <ul className="tag-scroll flex items-center justify-start space-x-3 overflow-x-scroll pr-2 py-1">
            <ForEach
              list={categories}
              render={(_index: number, cate: ICategory) => {
                return (
                  <li
                    onClick={() => {
                      setCateIdSelected(cate.id);
                    }}
                    className={cn(
                      "cursor-pointer px-2 py-1 rounded-md font-bold italic",
                      {
                        "bg-primary-content-color": cateIdSelected === cate.id,
                      }
                    )}
                  >
                    {cate.name}
                  </li>
                );
              }}
            />
          </ul>
        </div>
        <div>
          <label>Select a country</label>
          <ul className="tag-scroll flex items-center justify-start space-x-3 overflow-x-scroll pr-2 py-1">
            <ForEach
              list={countries}
              render={(index: number, con: ICountry) => {
                return (
                  <li
                    onClick={() => {
                      setCountryIdSelected(con.id);
                    }}
                    className={cn(
                      "cursor-pointer px-2 py-1 rounded-md font-bold italic",
                      {
                        "bg-primary-content-color":
                          countryIdSelected === con.id,
                      }
                    )}
                  >
                    {con.name}
                  </li>
                );
              }}
            />
          </ul>
        </div>
        <TextFiled
          type="text"
          error={errors.name !== undefined}
          label="Video's name"
          somethings={{
            ...register("name", {
              required: { value: true, message: "Please enter your name" },
              minLength: {
                message: "Name must be at least 5 characters",
                value: 5,
              },
            }),
          }}
        />
        {errors?.name?.message && (
          <TextHighLight value={errors?.name?.message} type="error" />
        )}
        <TextFiled
          type="text"
          error={errors.name !== undefined}
          label="Video's tag"
          somethings={{
            ...register("tag", {
              required: { value: true, message: "Please enter your video tag" },
            }),
          }}
        />
        {errors?.tag?.message && (
          <TextHighLight value={errors?.tag?.message} type="error" />
        )}
        <div className="flex items-center space-x-5">
          <div className="flex justify-center items-center space-x-2">
            <label>Public</label>
            <input
              type="checkbox"
              {...register("isPublic")}
              className="w-5 h-5"
            />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <label>Vip</label>
            <input type="checkbox" {...register("isVip")} className="w-5 h-5" />
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          When you choose to make it public, everyone will have the right to
          view your uploaded video. When choosing to be VIP, only the VIP
          account has the right to view your video with the prerequisite that
          your video is public.
        </p>
        <div className="space-y-1">
          <label>Description</label>
          <textarea
            className={cn(
              "outline-none ring-1 hover:ring-2 focus:ring-2 ring-white  rounded-lg h-48 w-full bg-bg-container-color p-2 scroll-custom",
              {
                "hover:ring-primary-content-color focus:ring-primary-content-color":
                  errors?.description?.message === undefined,
                "ring-red-700": errors?.description?.message !== undefined,
              }
            )}
            {...register("description", {
              required: {
                value: true,
                message: "Please enter a video description",
              },
            })}
          />
          {errors?.description?.message && (
            <TextHighLight value={errors?.description?.message} type="error" />
          )}
        </div>
        <TextFiled
          type="datetime-local"
          label="Video's release"
          somethings={{
            ...register("release", {
              required: {
                value: true,
                message: "Please select a release date",
              },
            }),
          }}
        />
        {errors?.release?.message && (
          <TextHighLight value={errors?.release?.message} type="error" />
        )}
        <TextFiled
          className="pt-2"
          type="submit"
          inputClassName="bg-primary-content-color cursor-pointer ring-0"
          value="Save video information"
        />
      </form>
    </div>
  );
};

export default NewInformationVideo;
