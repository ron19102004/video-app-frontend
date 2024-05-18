import React, { lazy, Suspense, useRef, useState } from "react";
import { Heading } from "../ui";
import ForEach from "../../libs/utils/foreach";
import { IPlaylist, IVideo } from "../../hooks/type";
import { Size } from "../../libs/utils/type.d";
const PlaylistItem = lazy(() => import("./PlaylistItem"));

interface IPlaylistContainerProps {
  playlist: IPlaylist;
  videos: IVideo[];
}
const PlaylistContainer: React.FC<IPlaylistContainerProps> = ({
  playlist,
  videos,
}) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };
  return (
    <div className="space-y-3">
      <div>
        <Heading value={playlist.name} size={Size.LG} />
      </div>
      <div className="relative">
        {scrollLeft > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2  bg-bg-container-color-trans rounded-full p-2 z-10"
            onClick={handleScrollLeft}
          >
            ⭠
          </button>
        )}
        <ul
          className="scroll-hidden flex gap-3 overflow-x-auto transition-all"
          ref={scrollContainerRef}
        >
          <ForEach
            list={videos}
            render={(_index: number, video: IVideo) => {
              return (
                <Suspense>
                  <PlaylistItem video={video} />
                </Suspense>
              );
            }}
          />
        </ul>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-bg-container-color-trans rounded-full p-2 z-10"
          onClick={handleScrollRight}
        >
          ⭢
        </button>
      </div>
    </div>
  );
};

export default PlaylistContainer;
