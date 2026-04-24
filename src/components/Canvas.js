import {useDroppable} from "@dnd-kit/core";
const Canvas = ({children}) => {
    const {setNodeRef, isOver} = useDroppable({
        id: "canvas",
    });
    return (
        <div 
        ref={setNodeRef}
        className={`min-h-[400px] p-5 rounded-2xl border-2 transition-all duration-300
            ${isOver ? "border-blue-500 bg-blue-200" : "border-gray-300 bg-white"}`}>
                {children}
            </div>
    )
};
export default Canvas;