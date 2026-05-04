import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

function SortableItem({field, children}) {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: field.id});

    const style= {
        transform:
        CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 :1,
        boxShadow: isDragging 
        ? "0 10px 25px rgba(0,0,0,0.2)" : "none",
    };
    return (
        <div ref={setNodeRef}
        style={{...style,
            touchAtion: "none" }}
             {...attributes}
        className="bg-white rounded-xl shadow p-3 mb-3">
            <div 
            className="h-2 cursor-grab mb-2" />
            <div>
            {children}
            </div>
        </div>
    );
}
export default SortableItem;