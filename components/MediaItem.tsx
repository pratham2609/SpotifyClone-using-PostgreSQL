'use client';

import useLoadingImage from "@/hooks/useLoadingImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void
}
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const imageUrl = useLoadingImage(data);
    const handleClick = () => {
        if (onClick) return onClick(data.id);
        // Default later
    }
    return (<div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50
    w-full p-2 rounded-md ">
        <div className="relative rounded-md max-w-[50px] overflow-hidden max-h-[50px] h-full w-full">
            <Image height={500} width={500} src={imageUrl || '/images/liked.png'} alt="Media Item" className="object-cover" />
        </div>
        <div className="flex flex-col gap-y-1  overflow-hidden">
            <p className="text-white truncate">{data.title}</p>
            <p className="text-neutral-400 text-sm truncate">{data.author}</p>
        </div>
    </div>);
}

export default MediaItem;