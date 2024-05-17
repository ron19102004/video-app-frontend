import CardVideo from './CardVideo';
import MediaPlayer from './MediaPlayer';
import CardVideoSearch from './CardVideoSearch';
export const formatDuration = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
export {
    CardVideo,
    MediaPlayer,
    CardVideoSearch
}
