import React, {useState} from "react";
import {Row, Col, Input, Button, DatePicker, Checkbox, Switch, Select, Radio, Rate, Slider} from "antd";
import { DndContext, useDraggable, useDroppable} from "@dnd-kit/core";

function DraggableButton({ id, text, onClick}) {
  const {attributes, listeners, setNodeRef} = useDraggable({ id });
  return (
    <div 
    ref={setNodeRef}
    {...listeners} 
    {...attributes}
    onMouseUp={onClick}
      className="group mb-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500
      hover:from-blue-600 hover:to-cyan-600 text-white font-medium text-sm shadow-md hover:shadow-xl 
      hover:scale-[1-03] active:scale-[0.97]
      tansition-all duration-300 cursor-grab text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-0
        group-hover:opacity-10 transition duration-300"></div>
  <span className="relative z-10 tracking-wide">
    {text}
    </span>
    </div>
  )
};

 const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [preview, setPreview] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const {setNodeRef} = useDroppable({
    id: "canvas",
  });

const addField = (type) => {
  let newField = {
        type, 
        id: Date.now(),
        label: type.toUpperCase(),
        required: false,
        placeholder: ""
    };
    if (type === "dropdown") {
      newField.options = ["Male", "Female"];
    }
    if (type === "yesno") {
      newField.label = "Are you married?";
      newField.options = ["Yes", "No"];
    }
    setFields([...fields, newField]);
};
  const handleDragEnd = (event) => {
      const {active, delta} = event;
    if (Math.abs(delta.x) < 10 &&
  Math.abs(delta.y) < 10) {
    return;
  }
  const type = active.id;
  addField(type);
  };
  const removeField = (id) => {
    const newFields =
    fields.filter((f) => f.id !== id);
    setFields(newFields);
    if (selectedField &&
      selectedField.id === id) {
         setSelectedField(null);
      }
  };
   const changeLabel = (id, value) => {
    const newFields = fields.map((f) => 
    f.id === id ? {...f, label: value} : f
 );
 setFields(newFields);
    if (selectedField &&
      selectedField.id === id) {
        setSelectedField({...selectedField,
          label: value});
      }
   };
    const toggleRequired =(id) => {
        const newFields = fields.map((f) =>
        f.id ===id ? {...f,
            required: !f.required} :f
        );
        setFields(newFields);
        if (selectedField &&
      selectedField.id === id) {
        setSelectedField({...selectedField,
          required: !selectedField.required});
      }
    };
      const changePlaceholder = (id, value) => {
        const newFields = fields.map((f) =>
        f.id === id ? { ...f,
          placeholder: value} : f
        );
        setFields(newFields);
        if (selectedField &&
          selectedField.id === id) {
            setSelectedField({...selectedField,
              placeholder: value
            });
          }
      };
      const handleInputChange = (id, value) => {
        setFormData({ ...FormData, [id] : value});
      };
      const validateForm =() => {
        let newErrors = {};
        fields.forEach((field) => {
          const value = formData[field.id] || "";
          if (field.required && !value) {
            newErrors[field.id] = `${field.label} is required`;
            return;
          }
           if (field.type === "email" && value) {
            if (!(value.includes("@") && 
            value.includes("."))) {
                   newErrors[field.id] = "Invalid email";
            }
           }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).legnth === 0;
      };
      const handleSubmit = () => {
        if (validateForm()) {
          setSubmitted(true);
          console.log(formData);
        }
      };
  return (
    <DndContext onDragEnd={handleDragEnd}>
    <>
    <div className="w-full flex justify-end mb-4">
     <div className="flex items-center justify-between w-full sm:w-auto
     bg-white norder border-gray-200 rounded-xl px-3 py-2 shadow-sm gap-3">
          <span className="text-sm md:text-base font-semibold text-gray-700">
            Preview Mode
          </span>
        <Switch checked={preview}
        onChange={() => setPreview(!preview)} />
        </div>
     </div>
      <Row gutter={[16, 16]}>

        {!preview && (

        <Col xs={24} md={24} lg={24} xl={6}>
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-gray-200
        hover:shadow-2xl transition-all duration-300 ring-2 ring-blue-200 hover:scale-[1.02]">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-5 tracking-wide text-center">
            Field Palette</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-5 bg-gradient-to-br
            from-gray-50 to-gray-100">
              <p className="text-center text-gary-500 text-sm sm:text-base mb-3 font-medium">
                Drag & Drog Fields
              </p>
              <div className="flex flex-col gap-2">
          <DraggableButton 
          id= "text"
          text= "Add Text"
          onClick={() =>
            addField("text")} />
              <DraggableButton 
               id= "email"
               text= "Add Email" 
              onClick={() =>
            addField("email")} />
              <DraggableButton 
          id= "number"
          text= "Add Number" 
               onClick={() =>
            addField("number")} />
              <DraggableButton 
          id= "password"
          text= "Add Password" 
              onClick={() =>
            addField("password")} />
              <DraggableButton 
          id= "date"
          text= "Add Date" 
               onClick={() =>
            addField("date")} />
               <DraggableButton 
          id= "dropdown"
          text= "Add DropDown" 
               onClick={() =>
            addField("dropdown")} />
               <DraggableButton 
          id= "yesno"
          text= "Add Yes/No" 
               onClick={() =>
            addField("yesno")} />
               <DraggableButton 
          id= "rating"
          text= "Add Rating" 
               onClick={() =>
            addField("rating")} />
               <DraggableButton 
          id= "slider"
          text= "Add Slider" 
               onClick={() =>
            addField("slider")} />
        </div>
        </div>
        </div>
        </Col>
        )}
        <Col xs={24} md={24} lg={24} xl={preview ? 24 : 12}>
        <div 
        ref={setNodeRef}
         className="bg-gradient-to-br from-white to-gray-50
         p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300
         border border-gray-200 min-h-[400px]  ring-2 ring-blue-200 hover:scale-[1.05]">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 -mt-3">
            Form Builder canvas
            </h2>
            {fields.length === 0 && (
              <div className="text-center text-gary-400 py-10 border-2 border-dashed rounded-xl">
                Drag Fields Here
                </div>
            )}
           {fields.map((field) => {
            return (
            <div key={field.id}
            onClick={() =>
              setSelectedField(field)}
             className={`mb-4 p-4 md:p-5 rounded-xl cursor-pointer transition-all duration-300
             bg-white ${selectedField && selectedField.id === field.id ? "border-2 border-blue-500 shadow-md hover:scale-[1.05]"
              : "border border-gray-200 hover:border-blue-400 hover:shadow-md"}`}>
                {!preview && (
                <Input
                value={field.label}
                onChange={(e) =>
                    changeLabel(field.id, e.target.value)}
                    placeholder="Field Label"
                    className="mb-3 rounded-lg" />
                )}
                    {(() => {
                        switch (field.type) {
              case "text":
                return (
                <Input
                value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                placeholder={field.placeholder || "Enter text"}
                 className="rounded-lg" />
              );
                 case "email":
                return (
                <Input
                 value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                placeholder={field.placeholder || "Enter Email"}
                className="rounded-lg py-2"/>
              );
                 case "number":
                return (
                <Input
                type="number"
                 value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                placeholder={field.placeholder || "Enter number"}
                 className="rounded-lg py-2"/>
              );
                 case "password":
                return (
                <Input.Password
                 value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                placeholder={field.placeholder || "Enter password"}
                className="rounded-lg py-2"/>
              );
                 case "date":
                return (
                <DatePicker
               className="w-full rounded-lg py-2"/>
              );
              case "dropdown":
                return (
                <Select
                className="w-full"
                 value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                placeholder="Select option"
                options={field.options?.map(opt => ({
                    label: opt,
                    value: opt
                  }))}
                />
              );
              case "yesno":
                return (
                <Radio.Group
                 value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                className="flex gap-4">
                  {field.options?.map(opt => (
                    <Radio key={opt} value={opt}>{opt}</Radio>
                  ))}
                </Radio.Group>
              );
                   case "rating":
                    return <Rate 
                     value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                    className="text-yellow-400" />;
                    
                    case "slider":
                    return ( 
                    <Slider
                     value={formData[field.id] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.value,
                  })
                }
                    className="mt-2"
                    trackStyle={{backgroundColor: "#3b82f6", height: 6,
                    }}
                    railStyle={{backgroundColor: "#e5e7eb", height: 6}} 
                    />
                  );
                default:
                  return null;
            }
           })()}
           {error[field.id] && (
            <p className="text-red-500 text-sm mt-1">
              {error[field.id]}
            </p>
           )}
           {!preview && (
           <div
           className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-400">
              Click to edit
            </span>
                <Button danger
                 size="small"
                 type="primary"
                 className="rounded-lg text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}>
                        Delete
                    </Button>
                    </div>
           )}
           </div>
            );
         })}
           {preview && fields.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Button 
              size="large"
              onClick={handleSubmit}
                className="px-12 py-2 text-white font-medium rounded-xl
                bg-gradient-to-r from-blue-500 to-cyan-500
                hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-xl transition-all duration-300 border-none">
                Submit Form
              </Button>
              {submitted && (
                <div className="text-black font-medium">
                  Form Submitted Successfully
                  </div>
              )}
              </div>
           )}
        </div>
        </Col>
      {!preview && (
        <Col xs={24} md={24} lg={24} xl={6}>
          <div 
          className="bg-gradient-to-br from-white to-gray-50
         p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300
         border border-gray-200 min-h-[400px]  ring-2 ring-blue-200 hover:scale-[1.05]">
            <div className="mb-3 border-b pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 -mt-3">
                 Properties
            </h2>
            </div>
            {selectedField ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Label
                  </label>
              <Input
              value={selectedField.label}
              onChange={(e) =>
                changeLabel(selectedField.id,
                  e.target.value)
              }
              className="!h-[34px] !rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Placeholder
                </label>
              <Input
              value={selectedField.placeholder}
              onChange={(e) =>
                changePlaceholder(selectedField.id,
                  e.target.value)
              }
              className="!h-[34px] !rounded-lg" />
              </div>
              <div className="flex items-center justify-between
              bg-gray-50 border rounded-lg px-2 py-2">
                <span className="text-sm font-medium text-gray-600">
                  Required 
                </span>
              <Checkbox
              checked={selectedField.required}
              onChange={(e) => {
                e.stopPropagation();
                toggleRequired(selectedField.id);
              }}
                />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px]
              text-gray-400 text-sm">
                Select a field
                </div>
            )}
          </div>
        </Col>
      )} 
      </Row>
      </>
      </DndContext>
  );
};
 export default FormBuilder;