import React, { useEffect, useState } from "react";
import useVideoSearch from "../../../../hooks/useVideoSearch.hook";
import { useQuery } from "../../../router";
import { IVideo } from "../../../../hooks/type";
import ForEach from "../../../../libs/utils/foreach";
import { CardVideo, CardVideoSearch } from "../../../../components/videos";
import { Heading } from "../../../../components/ui";
import { Size } from "../../../../libs/utils/type.d";

const SearchResultPage: React.FC = () => {
  const query = useQuery();
  const { search } = useVideoSearch();
  const [queryValue, setQueryValue] = useState<string>("");
  const [videos, setVideos] = useState<IVideo[]>([]);
  const init = async () => {
    const name = (query.get("name") ?? "").split("-").join(" ");
    setQueryValue(name);
    const videos = await search({ name: name });
    setVideos(videos);
  };
  useEffect(() => {
    init();
  }, [query]);
  return (
    <div>
      <Heading
        value={`${videos.length} ${
          videos.length > 1 ? `results` : `result`
        } for "${queryValue}"`}
        size={Size.LG}
      />
      <ul className="flex flex-col space-y-3 pt-4">
        <ForEach
          list={videos}
          render={(_index: number, item: IVideo) => {
            return (
              <>
                <CardVideoSearch video={item} className="hidden md:flex" />
                <CardVideo video={item} className="md:hidden block" />
              </>
            );
          }}
        />
      </ul>
    </div>
  );
};

export default SearchResultPage;
