import {useDraggable} from "@dnd-kit/core";
function DraggableButton({ id, text, onClick}) {
  const {attributes, listeners, setNodeRef} = useDraggable({ id });
  return (
    <div 
    ref={setNodeRef}
    {...attributes}
      className="group mb-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500
      hover:from-blue-600 hover:to-cyan-600 text-white font-medium text-sm shadow-md hover:shadow-xl 
      hover:scale-[1-03] active:scale-[0.97]
      tansition-all duration-300 cursor-grab text-center relative overflow-hidden">
           <div 
    {...listeners}
    className="absolute top-0 left-0 w-full h-3 cursor-grab" />
        <div 
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className="cursor-pointer text-center">
    {text}
    </div>
    </div>
  )
};
export default DraggableButton;