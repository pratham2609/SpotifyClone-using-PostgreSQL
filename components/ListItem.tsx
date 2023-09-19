"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
    image: string,
    name: string;
    href: string;
}
const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
    const router = useRouter();
    const onClick = () => {
        //add auth before push
        router.push(href)
    }
    return (<button
        onClick={onClick}
        className="relative group flex items-center rounded-md overflow-hidden gap-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
        <div className="relative min-w-[64px] min-h-[64px]">
            <Image className="object-cover" fill alt="image" src={image} />
        </div>
        <p className="font-medium truncate py-5">{name}</p>
        <div className="absolute transition opacity-0 group-hover:opacity-100 hover:scale-110 flex items-center justify-center rounded-full bg-green-500 p-4 drop-shadow-md right-5">
            <FaPlay className="text-black" />
        </div>
    </button>);
}

export default ListItem;