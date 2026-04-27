import {useDroppable} from "@dnd-kit/core";
const Canvas = ({children}) => {
    const {setNodeRef, isOver} = useDroppable({
        id: "canvas",
    });
    return (
        <div 
        ref={setNodeRef}
        className={`min-h-[400px] w-full p-5 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col justify-start
            ${isOver ? "border-blue-500 bg-blue-200 shadow-lg scale-[1.01]" : "border-gray-300 bg-white"}`}>
                {children}
            </div>
    )
};
export default Canvas;