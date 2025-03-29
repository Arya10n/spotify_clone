import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/stores/useMusicStore';
import { uesPlayerStore } from '@/stores/usePlayerStore';
import { Clock, Pause, Play } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, isLoading, currentAlbum } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = uesPlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      song => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      // start playing the album from the beginning
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    // Check if the clicked song is already playing
    const isCurrentSongPlaying =
      currentSong?._id === currentAlbum.songs[index]._id;

    if (isCurrentSongPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum?.songs, index); // Start playing the new song
    }
  };

  return (
    <div className='h-full  '>
      <ScrollArea className='h-full rounded-md bg-amber-200'>
        {/* Main content */}
        <div className='relative min-h-full'>
          {/* background gradient */}
          <div
            className='absolute inset-0 h-screen bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none'
            aria-hidden='true'
          />

          {/* Content */}
          <div className='relative z-10 '>
            <div className='flex p-6 gap-6 pb-8'>
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className='w-44 h-44 shadow-x1 rounded'
              />
              <div className='flex flex-col justify-end'>
                <p className='text-sm pl-1 font-medium'>Album</p>
                <h2 className='text-7xl font-bold my-4'>
                  {currentAlbum?.title}
                </h2>
                <div className='flex items-center gap-2'>
                  <span>{currentAlbum?.artist} </span>
                  <span>• {currentAlbum?.releaseYear}</span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                </div>
              </div>
            </div>

            {/* play button */}
            <div className='flex px-6 pb-4 gap-6'>
              <Button
                size='icon'
                onClick={handlePlayAlbum}
                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all'>
                {isPlaying &&
                currentAlbum?.songs.some(
                  song => song._id === currentSong?._id
                ) ? (
                  <Pause className='!w-6 !h-6 fill-black text-black stroke-0' />
                ) : (
                  <Play className='!w-6 !h-6 fill-black text-black'></Play>
                )}
              </Button>
            </div>

            {/* Table section */}
            <div className='bg-black/20 backdrop-blur-sm'>
              {/* table header */}
              <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-zinc-700'>
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4' />
                </div>
              </div>

              {/* songs list */}
              <div className='px-5'>
                <div className='space-y-2 py-4'>
                  {currentAlbum?.songs.map((song, idx) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(idx)}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}>
                        <div className='flex items-center justify-center'>
                          {isCurrentSong ? (
                            isPlaying ? (
                              <div className='size-4 flex items-center text-green-500'>
                                <Pause /> {/* Show Pause Icon when playing */}
                              </div>
                            ) : (
                              <div className='size-4 flex items-center text-green-500'>
                                <Play /> {/* Show Play Icon when paused */}
                              </div>
                            )
                          ) : (
                            <>
                              <span className='group-hover:hidden'>
                                {idx + 1}
                              </span>
                              <Play className='h-4 w-4 hidden group-hover:block' />
                            </>
                          )}
                        </div>
                        <div className='flex items-center gap-3'>
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className='size-10'
                          />
                          <div>
                            <div className='font-medium text-white'>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          {song.createdAt.split('T')[0]}
                        </div>
                        <div className='flex items-center'>
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default AlbumPage;
