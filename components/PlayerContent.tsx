'use client';
import { Song } from "@/types"
import MediaItem from "./MediaItem";
import { BsPlayFill, BsPauseFill } from 'react-icons/bs'
import LikeButton from "./LikeButton";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
interface PlayerContentProps {
    song: Song;
    songUrl: string
}
const PlayerContent: React.FC<PlayerContentProps> = ({
    song, songUrl
}) => {
    const Icon = false ? BsPauseFill : BsPlayFill
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center-gap-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer" onClick={() => { }}>
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            <div className="hidden h-full md:flex items-center justify-center w-full max-w-[722px] gap-6">
                <AiFillStepBackward onClick={() => { }} size={30} className="text-neutral-400 cursor-pointer hover:text-white
                transition
                " />
                <div onClick={() => { }} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward onClick={() => { }} size={30} className="text-neutral-400 cursor-pointer hover:text-white
                transition
                " />
            </div>
        </div>
    )
}

export default PlayerContent