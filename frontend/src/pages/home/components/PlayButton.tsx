import { Button } from '@/components/ui/button';
import { uesPlayerStore } from '@/stores/usePlayerStore';
import { Song } from '@/types';
import { Pause, Play } from 'lucide-react';

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    uesPlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };
  return (
    <Button
      onClick={handlePlay}
      className={`absolute size-8  rounded-full top-1/2 -translate-y-1/2 right-2 bg-green-500 hover:bg-green-400 hover:scale-110 transition-all opacity-0  ${
        isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
      {isCurrentSong && isPlaying ? (
        <Pause className='size-5 stroke-0 fill-black text-black' />
      ) : (
        <Play className='size-5 fill-black text-black' />
      )}
    </Button>
  );
};
export default PlayButton;
