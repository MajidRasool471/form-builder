import React, {useState, useEffect} from "react";
const TaskField = ({ field, formData, handleInputChange}) => {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const saved =
        localStorage.getItem(field.id);
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }, [field.id]);


    const addTask = () => {
        if (input.trim() === "") return;
        const updated = [...tasks, {text: input, done: false}];
        setTasks(updated);
        handleInputChange(field.id, updated);
        localStorage.setItem(field.id,
            JSON.stringify(updated));
        setInput("");
    };
    return (
        <div>
            <input
            type="text"
            valye={input}
            onChange={(e) =>
                setInput(e.target.value)}
                placeholder={field.placeholder || "Enter Task"}
                className="rounded-lg py-2 border px-2" />
                <button 
                onClick={addTask}
                className="ml-2 px-2 py-1 bg-blue-500 text-white">
                    Add
                </button>
                <ul 
                className="mt-2">
                    {tasks.map((t, i) => (
                        <li key={i}
                        className="flex justify-between items-center mt-1">
                        <div className="flex items-center gap-2">
                            <input 
                            type="checkbox"
                            checked={t.done || false}
                            onChange={() => {
                                const updated = [...tasks];
                                updated[i].done = !
                                updated[i].done;
                                setTasks(updated);
                                handleInputChange(field.id, updated);
                                 localStorage.setItem(field.id,
                                 JSON.stringify(updated));
                            }}
                            />
                            <span 
                             style={{
                                textDecoration: t.done ? "line-through" : "none",
                             }} >
                                {t.text}
                             </span>
                        </div>
                        <button 
                        onClick={() => {
                            const updated =
                            tasks.filter((_, index) => index !== i);
                            setTasks(updated);
                            handleInputChange(field.id, updated);
                             localStorage.setItem(field.id,
                               JSON.stringify(updated));
                        }}
                        className="text-red-500" >
                            ❌
                        </button>
                        </li>
                    ))}
                </ul>
        </div>
    );
};
export default TaskField;