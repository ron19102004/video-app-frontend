import React, { useEffect, useState } from "react";
import useVideoClient from "../../../../hooks/useVideoClient.hook";
import ForEach from "../../../../libs/utils/foreach";
import { ICategory, IVideo } from "../../../../hooks/type";
import CardVideo from "../../../../components/videos/CardVideo";
import useCategory from "../../../../hooks/useCategory.hook";
import { Link } from "react-router-dom";
import cn from "../../../../libs/utils/cn";

const HomePage: React.FC = () => {
  const { fetchVideos } = useVideoClient();
  const { fetchCategories } = useCategory();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const init = async () => {
    const vids = await fetchVideos(0);
    const cates = await fetchCategories();
    setVideos(vids);
    setCategories(cates);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <ul className="home-tag-categories flex flex-row max-w-full overflow-x-auto space-x-2 pb-2">
        <ForEach
          list={categories}
          render={(_index: number, item: ICategory) => {
            return (
              <Link
                to={`/video/search?category_id=${item.id}`}
                className={cn("bg-bg-container-color px-4 py-1 rounded-xl")}
              >
                {item.name}
              </Link>
            );
          }}
        />
      </ul>
      <ul className="grid gap-6 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ForEach
          list={videos}
          render={(_index: number, item: IVideo) => {
            return <CardVideo video={item} imageClassName="lg:h-52" />;
          }}
        />
      </ul>
    </div>
  );
};

export default HomePage;
