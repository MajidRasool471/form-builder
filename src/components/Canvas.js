import {useDroppable} from "@dnd-kit/core";
import {useEffect, useRef} from "react";
const Canvas = ({children}) => {
    const {setNodeRef, isOver} = useDroppable({
        id: "canvas",
    });
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight;
        }
    }, [children]);
    return (
        <div 
        ref={(node) => {
            setNodeRef(node);
            scrollRef.current = node;
        }}
        className={`min-h-[650px] max-h-[450px] overflow-y-auto w-full p-4 md:p-5  hover:shadow-2xl transition-all 
            duration-300 ring-2 ring-blue-200 hover:scale-[1.02] 
            rounded-2xl transition-all duration-300 flex flex-col
            ${isOver ? "border-blue-500 bg-blue-200 shadow-lg scale-[1.01]" : "border-gray-300 bg-white"}`}>
                {children}
            </div>
    )
};
export default Canvas;