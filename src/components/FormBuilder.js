import React, {useState, useEffect, useRef} from "react";
import {Row, Col, Input, Button, DatePicker, Checkbox,  Switch, Select, Radio, Rate, Slider, message} from "antd";
import {DndContext, pointerWithin, PointerSensor, useSensor, useSensors, DragOverlay} from "@dnd-kit/core";
import DraggableButton from "./DraggableButton";
import Canvas from "./Canvas";
import SortableItem from "./SortableItem";
import {Sortable, verticalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import StepsNavigation from "./StepsNavigation";
import { stepTitles, stepFields } from "./StepConfig";
import {addFieldHandler, handleDragEndHandler} from "./utils/fieldHelpers";
import {removeFieldHandler,changeLabelHandler,toggleRequiredHandler, changePlaceholderHandler} from "./utils/fieldUpdateHelper";
import {startDrawing, stopDrawing, drawSignature, clearSignature, loadSignature} from "./utils/SignatureHelper";
import ScannerField from "./utils/ScannerField";
 const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [preview, setPreview] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitStep, setSubmitStep] = useState(1);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
    loadSignature(canvasRef);
    }, 500);
  }, []);

  useEffect(() => {
    const savedFields =
    localStorage.getItem("formFields");
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
  }, []);
  useEffect(() => {
    if(fields.length > 0) {
    localStorage.setItem(
      "formFields",
      JSON.stringify(fields)
    );
  } else {
    localStorage.removeItem("formFields");
  }
  }, [fields]);

  useEffect(() => {
    if (preview) {
      setSubmitted(false)
    }
  }, [preview]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      },
    })
  );
 const handleDragStart = (event) => {
  setActiveField(event.active.id);
 };
      const handleInputChange = (id, value) => {
        setFormData({...formData, [id] : value});
      };
      const validateForm =() => {
        let newErrors = {};
        fields.forEach((field) => {
          const value = formData[field.id] || "";
          if (field.required && !value) {
            newErrors[field.id] = `${field.label} is required`;
            return;
          }
          if (field.type === "phone" && value) {
            if (value.length !== 11) {
              newErrors[field.id] = "Phone must be 11 digits";
            }
          }
           if (field.type === "email" && value) {
            if (!(value.includes("@") && 
            value.includes("."))) {
                   newErrors[field.id] = "Invalid email";
            }
           }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      const currentStepFields =
      fields.filter(
        (field) => field.step ===
        currentStep
      );
      const handleSubmit = () => {
        if (validateForm()) {
          setSubmitted(true);
          message.success("Form Submitted Successfully");
          console.log(formData);
        }
      };
      const exportFormAsJson = () => {
        const jsonData =
        JSON.stringify(fields, null, 2);
        const blob = new Blob([jsonData], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "form-builder.json";
        link.click();
        URL.revokeObjectURL(url);
      };
  return (
    <DndContext 
    sensors={sensors}
    collisionDetection={pointerWithin}
    onDragStart={handleDragStart}
    onDragEnd={(event) => handleDragEndHandler(
       event,
       setFields,
        setActiveField,
         addFieldHandler,
       fields,
       currentStep,
       stepFields
      )
    }
    >
    <>
    <div className="w-full flex justify-end mb-4">
     <div className="flex items-center justify-between w-full sm:w-auto
     bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm gap-3">
          <span className="text-sm md:text-base font-semibold text-gray-700">
            Preview Mode
          </span>
        <Switch checked={preview}
        onChange={(checked) => setPreview(!preview)} />
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
            from-gray-50 to-gray-100 max-h-[600px] overflow-y-auto">
              <p className="text-center text-gray-500 text-sm sm:text-base mb-3 font-medium">
                Drag & Drog Fields
              </p>
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-gray-700 text-center mt-2">Basic Fields</h3>
          <DraggableButton 
          id= "text"
          text= "Add Text"
            />
              <DraggableButton 
               id= "email"
               text= "Add Email" 
               />
              <DraggableButton 
          id= "number"
          text= "Add Number" 
             />
              <DraggableButton 
          id= "password"
          text= "Add Password" 
             />
               <DraggableButton 
          id= "phone"
          text= "Add Phone" 
               />
              <DraggableButton 
          id= "date"
          text= "Add Date" 
             />
               <h3 className="font-bold text-gray-700 mt-2 text-center">Selection Fields</h3>
               <DraggableButton 
          id= "dropdown"
          text= "Add DropDown"  />
               <DraggableButton 
          id= "yesno"
          text= "Add Yes/No" 
               />
              <h3 className="font-bold text-gray-700 mt-2 text-center">Advanced Fields</h3>
               <DraggableButton 
          id= "rating"
          text= "Add Rating" 
               />
               <DraggableButton 
          id= "slider"
          text= "Add Slider" 
              />
              <h3 className="font-bold text-gray-700 mt-2 text-center">Media Fields</h3>
             <DraggableButton 
          id= "file"
          text= "Add File Upload" 
              />
             <DraggableButton 
          id= "image"
          text= "Add Image" 
               />
                  <DraggableButton 
          id= "video"
          text= "Add Video"
              />
              <h3 className="font-bold text-gray-700 mt-2 text-center">Utility Fields</h3>
                      <DraggableButton 
          id= "signature"
          text= "Add signature"
              />
                      <DraggableButton 
          id= "scanner"
          text= "Add Scanner"
              />
                      <DraggableButton 
          id= "task"
          text= "Add Task"
              />
              
        </div>
        </div>
        </div>
        </Col>
        )}
        <Col xs={24} md={24} lg={24} xl={preview ? 24 : 12}>
        <Canvas>
          <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
            Form Builder canvas
            </h2>
            {preview && (
              <div className="hidden sm:flex absolute right-0 top-0">
               <Button 
           onClick={exportFormAsJson}
           className="px-8 py-2 w-fit text-white font-medium rounded-xl
                bg-gradient-to-r from-blue-500 to-cyan-500
                hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-xl transition-all duration-300 border-none">
            Export Form JSON
           </Button>
           </div>
            )}
           </div>
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-600">
                {stepTitles[currentStep]}
              </h3>
              <p className="text-gray-600">
                Step {currentStep + 1}
              </p>
            </div>
            <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}>
           {currentStepFields.map((field) => (
            <SortableItem
            key={field.id}
            field={field}>
              <div
            onClick={() =>
              setSelectedField(field)}
             className={`mb-4 p-4 md:p-5 rounded-xl cursor-pointer transition-all duration-300
             bg-white ${selectedField && selectedField.id === field.id ? "border-2 border-blue-500 shadow-md hover:scale-[1.05]"
              : "border border-gray-200 hover:border-blue-400 hover:shadow-md"}`}>
                {!preview && (
                <Input
                value={field.label}
                onChange={(e) =>
                    changeLabelHandler(field.id,
                       e.target.value,
                      fields,
                    setFields,
                     selectedField,
                    setSelectedField)}
                    placeholder="Field Label"
                    className="mb-3 rounded-lg" />
                )}
                  {preview && (
                    <label className="block mb-1 font-medium text-gray-700">
                      {field.label}
                    </label>
                  )}
                    {(() => {
                        switch (field.type) {
              case "text":
                return (
                <Input
                value={formData[field.id] || ""}
                onChange={(e) =>
                  handleInputChange(field.id, e.target.value)
                }
                placeholder={field.placeholder || "Enter text"}
                 className="rounded-lg" />
              );
                 case "email":
                return (
                <Input
                 value={formData[field.id] || ""}
                onChange={(e) =>
                    handleInputChange(field.id, e.target.value)
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
                    handleInputChange(field.id, e.target.value)
                }
                placeholder={field.placeholder || "Enter number"}
                 className="rounded-lg py-2"/>
              );
                 case "password":
                return (
                <Input.Password
                 value={formData[field.id] || ""}
                onChange={(e) =>
                    handleInputChange(field.id, e.target.value)
                }
                placeholder={field.placeholder || "Enter password"}
                className="rounded-lg py-2"/>
              );
               case "phone":
                return (
                <Input
                type="tel"
                 value={formData[field.id] || ""}
                onChange={(e) => {
                  const value=
                  e.target.value.replace(/\D/g, "");
                  handleInputChange(field.id, value.slice(0, 11));
                }}
                placeholder={field.placeholder || "Enter phone number"}
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
                 value={formData[field.id] || undefined}
                onChange={(value) =>
                    handleInputChange(field.id, value)
                }
                placeholder={field.placeholder || "Select option"}
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
                  handleInputChange(field.id, e.target.value)
                }
                className="flex gap-4">
                  {(field.options || []).map((opt) => (
                    <Radio key={opt} value={opt}>{opt}</Radio>
                  ))}
                </Radio.Group>
              );
                   case "rating":
                    return <Rate 
                     value={formData[field.id] || 0}
                onChange={(value) =>
               handleInputChange(field.id, value)
                }
                    className="text-yellow-400" />;
                    
                    case "slider":
                    return ( 
                    <Slider
                     value={formData[field.id] || 0}
                onChange={(value) =>
                    handleInputChange(field.id, value)
                }
                    className="mt-2"
                    trackStyle={{backgroundColor: "#3b82f6", height: 6,
                    }}
                    railStyle={{backgroundColor: "#e5e7eb", height: 6}} 
                    />
                  );
                   case "file":
                return (
                  <div>
                    {!preview && (
                <Input
                type="file"
                onChange={(e) => {
                  handleInputChange(field.id, e.target.files[0]);
                }}
                className="rounded-lg py-2"/>
              )}
              {formData[field.id] && (
                <p className="mt-2 text-sm text-gray-600">
                  {formData[field.id].name}
                </p>
              )}
              </div>
                );
               case "image":
                return (
                  <div>
                    {!preview && (
                <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file=
                  e.target.files[0];
                  handleInputChange(field.id, file);
                }}
                    />
              )}
                    {formData[field.id] && (
                    <img
                    src={URL.createObjectURL(formData[field.id])}
                    alt="preview"
                className="mt-2 w-full max-w-xs h-auto object-cover rounded-lg"/>
                )}
              </div>
              );
               case "video":
                return (
                  <div>
                    {!preview && (
                <Input
                type="file"
                accept="video/mp4"
                onChange={(e) => {
                  const file=
                  e.target.files[0];
                  if (!file) return;
                  if(file.type !== "video/mp4") {
                    alert("only MP4 videos allowed");
                    return;
                  }
                  const maxSize = 100 * 1024 * 1024;
                  if (file.size > maxSize) {
                    alert("Max video size is 100MB");
                    return;
                  }
                  handleInputChange(field.id, file);
                }}
                   className="rounded-lg py-2" />
              )}
                    {formData[field.id] && (
                    <div className="mt-2">
                    <video
                    controls
                    className="w-full rounded-lg"
                    src={URL.createObjectURL(formData[field.id])}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData[field.id].name}
                    (
                    {(formData[field.id].size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                  </div>
                )}
              </div>
              );
              case "signature":
                return (
                 <div className="space-y-3">
                  <label className="font-semibold text-gray-700">
                    {field.label}
                  </label>
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 bg-gray-50">
                    <canvas 
                    ref={canvasRef}
                    width={300}
                    height={120}
                    className="w-full bg-white rounded-lg border cursor-crosshair" 
                    onMouseDown={() =>
                      startDrawing(setIsDrawing, canvasRef)
                    }
                    onMouseUp={() =>
                      stopDrawing(setIsDrawing, canvasRef)
                    }
                     onMouseMove={(e) =>
                      drawSignature(e, isDrawing, canvasRef)
                    }
                    onMouseLeave={(e) =>
                      drawSignature(e, isDrawing, canvasRef)
                    }
                    />
                    <div className="flex justify-end mt-3">
                      <button 
                      onClick={() =>
                        clearSignature(canvasRef)
                      }
                      className="px-4 py-1 rounded-lg bg-red-500 text-white">
                        Clear
                      </button>
                      </div>
                 </div>
                 </div>
                 );
              case "scanner":
                return (
                  <div className="space-y-3">
                    <label className="font-semibold text-gray-700">
                      {field.label}
                    </label>
                <ScannerField 
                onScan={(value) =>
                  handleInputChange(field.id, value)
                }
                />
                {formData[field.id] && (
                  <p className="text-sm text-green-600">
                    Scanned:
                    {formData[field.id]}
                  </p>
                )}
                </div>
                );
              case "task":
                return (
                <Input
                type="number"
                 value={formData[field.id] || ""}
                onChange={(e) =>
                    handleInputChange(field.id, e.target.value)
                }
                placeholder={field.placeholder || "Enter Task"}
                 className="rounded-lg py-2"/>
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
                  removeFieldHandler(field.id,
                    fields,
                   setFields,
                selectedField,
                setSelectedField
                  );
                }}>
                        Delete
                    </Button>
                    </div>
           )}
           </div>
           </SortableItem>
         ))}
         </SortableContext>
         {!preview && (
         <div className="text-center text-blue-400 py-12 border-2 border-dashed
         border-blue-300 bg-blue-50 rounded-2xl mt-4 font-medium tex-lg">
        Drag Fields here
         </div>
         )}
           {preview && 
           currentStep === submitStep &&
           fields.length > 0 && (
            <>
              <div className="mt-6 flex justify-center">
              <Button 
              size="large"
              onClick={handleSubmit}
                className="px-8 py-2 w-fit text-white font-medium rounded-xl
                bg-gradient-to-r from-blue-500 to-cyan-500
                hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-xl transition-all duration-300 border-none">
                Submit Form
              </Button>
           </div>
             {preview && (
              <div className="flex justify-center mt-4 sm:hidden">
               <Button 
           onClick={exportFormAsJson}
           className="px-8 py-2 w-fit text-white font-medium rounded-xl
                bg-gradient-to-r from-blue-500 to-cyan-500
                hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-xl transition-all duration-300 border-none">
            Export Form JSON
           </Button>
           </div>
            )}
            </>
           )}
        <StepsNavigation 
        currentStep={currentStep}
        setCurrentStep={setCurrentStep} 
        submitStep={submitStep} />
        </Canvas>
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
            <div className="space-y-1 mb-4">
              <label className="text-sm font-medium text-gray-600">
                Ends Form At Step
              </label>
              <Input
              type="number"
              min={1}
              max={stepTitles.length}
              value={submitStep + 1}
              onChange={(e) =>
                setSubmitStep(Number(e.target.value) -1)
              }
              className="rounded-lg" />
            </div>
            {selectedField ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Label
                  </label>
              <Input
              value={selectedField.label || ""}
              onChange={(e) =>
                changeLabelHandler(selectedField.id,
                e.target.value,
                fields,
               setFields,
               selectedField,
              setSelectedField)
              }
              className="rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Placeholder
                </label>
              <Input
              value={selectedField.placeholder || ""}
              onChange={(e) =>
                changePlaceholderHandler(selectedField.id,
                  e.target.value,
                  fields,
                   setFields,
                   selectedField,
        setSelectedField
                 )
              }
              className="rounded-lg" />
              </div>
              <div className="flex items-center justify-between
              bg-gray-50 border rounded-lg px-3 py-2 shadow-md">
                <span className="text-sm font-medium text-gray-600">
                  Required 
                </span>
              <Checkbox
              checked={selectedField.required}
              onChange={(e) => {
                e.stopPropagation();
                toggleRequiredHandler(selectedField.id,
                  fields,
                setFields,
                selectedField,
                 setSelectedField
                );
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
       <DragOverlay>
        {activeField ? (
          <div className="px-4 py-2 rounded-xl bg-blue-500 text-white shadow-2xl border-2 border-white font-medium">
           {activeField === "text" && "📑 Text"}
             {activeField === "email" && "📩 Email"}
               {activeField === "number" && "🔢 Number"}
                 {activeField === "password" && "🔒 Password"}
                   {activeField === "phone" && "📳 Phone"}
                     {activeField === "date" && "📅 Date"}
                       {activeField === "dropdown" && "⏬ Dropdown"}
                         {activeField === "yesno" && "✔ YesNo"}
                           {activeField === "rating" && "⭐ Rating"}
                             {activeField === "slider" && "🎚 Slider"}
                               {activeField === "file" && "📁 File"}
                                 {activeField === "image" && "🖼 Image"}
                                   {activeField === "video" && "🎥 Video"}
          </div>
        ) : null}
       </DragOverlay>
      </DndContext>
  );
};
 export default FormBuilder;