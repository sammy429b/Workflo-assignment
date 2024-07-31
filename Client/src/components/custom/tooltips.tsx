import { Calendar, CircleHelp, Filter, PlusCircle, Share, Share2, Sparkles } from "lucide-react"
import { Input } from "../ui/input";
import CreateTaskPopup from "./createTaskPopup";
import { useAuth } from "@/context/useAuth";

function Tooltips() {
    const {userName} = useAuth(); 

    const tooltipsData = [
        {
            imgSrc: "1.svg", // Add the appropriate image source
            imgAlt: "Introducing tags",
            title: "Introducing tags",
            description: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
        },
        {
            imgSrc: "2.svg", // Add the appropriate image source
            imgAlt: "Share Notes Instantly",
            title: "Share Notes Instantly",
            description: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
        },
        {
            imgSrc: "3.svg", // Add the appropriate image source
            imgAlt: "Access Anywhere",
            title: "Access Anywhere",
            description: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
        }
    ];
    const items = [
        { text: 'Calendar view', Icon: Calendar },
        { text: 'Automation', Icon: Sparkles },
        { text: 'Filter', Icon: Filter },
        { text: 'Share', Icon: Share2 }
    ];

    return (
        <>
            <div className="px-8 mt-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-5xl font-semibold">Good Morning, {userName}!</h2>
                    </div>
                    <div className="flex justify-center gap-x-4 items-center cursor-pointer">
                        <p>
                            Help & feedback
                        </p>
                        <CircleHelp aria-label="Help and feedback" />
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        {tooltipsData.map((tooltip, index) => (
                            <div key={index} className="bg-white md:w-[32%] h-[9rem] rounded p-4 flex gap-x-2">
                                <img src={tooltip.imgSrc} alt={tooltip.imgAlt} className="w-1/4" />
                                <div>
                                    <h3 className="text-[#757575] text-lg font-semibold">{tooltip.title}</h3>
                                    <p className="text-[#868686] text-base text-justify">{tooltip.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="w-1/6">
                        <Input type="search" placeholder="Search" />
                    </div>
                    <div className="w-1/6"></div>
                    <div className="w-3/6 flex justify-around items-center">
                        {items.map(({ text, Icon }, index) => (
                            <div
                                key={index}
                                className="flex justify-center items-center gap-x-2 text-[#757575] cursor-pointer"
                            >
                                <p>{text}</p>
                                <Icon />
                            </div>
                        ))}
                    </div>
                    <div className="">
                        <CreateTaskPopup/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tooltips;
