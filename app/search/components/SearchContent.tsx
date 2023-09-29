'use client';

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    if (songs.length == 0 || !songs) {
        return <div className="text-neutral-400 w-full px-6 gap-y-2 flex flex-col text-3xl">
            No Songs Found
        </div>
    }
    const onPlay = useOnPlay(songs)
    return (<section className="flex flex-col gap-y-2 w-full px-6">
        {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-x-4 w-full">
                <div className="flex-1">
                    <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
                </div>
                <LikeButton songId={song.id} />
            </div>
        ))}
    </section>);
}

export default SearchContent;