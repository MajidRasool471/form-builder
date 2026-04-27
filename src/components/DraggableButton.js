import {useDraggable} from "@dnd-kit/core";
function DraggableButton({ id, text}) {
  const {attributes, listeners, setNodeRef, isDragging} = useDraggable({ id });
  return (
    <div 
    ref={setNodeRef}
    {...attributes}
      className={`group mb-2 px-2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500
      text-white font-medium text-sm shadow-md
      tansition-all duration-300 cursor-grab text-center relative overflow-hidden
      cursor-grab hover:scale-[1.03] active:scale-[0.97]
      ${isDragging ? "opacity-50 scale-105 rotate-2 shadow-2xl border-2 border-white" : ""}`}>
           <div 
    {...listeners}
    className="w-full h-full cursor-grab active:cursor-grabbing text-center">
    {text}
    </div>
    </div>
  )
};
export default DraggableButton;