 import {arrayMove} from "@dnd-kit/sortable";
 export const addFieldHandler = (
    type,
    fields,
    setFields,
    currentStep,
    stepFields
) => {
  let newField = {
        id: Date.now().toString() + Math.random(),
        type,
        label: type.toUpperCase(),
        required: false,
        placeholder: "",
        step: currentStep,
    };
    if (type === "dropdown") {
      newField.options = ["option 1", "option 2"];
    }
    if (type === "yesno") {
      newField.label = "ARE YOU MARRIED?";
      newField.options = ["Yes", "No"];
    }
     if (type === "phone") {
      newField.placeholder = "Enter phone number";
     }
     if (type === "signature") {
      newField.label = "Signature";
     }
      if (type === "scanner") {
      newField.placeholder = "Scan QR code";
     }
    setFields((prev) => [...prev, newField]);
};
    export const handleDragEndHandler = (
        event,
         setFields,
         setActiveField,
         addFieldHandler,
         fields,
         currentStep,
         stepFields
    ) => {
        const {active, over} = event;
        if (!over) return;
        const sidebarItems = [
          "text",
          "email",
          "number",
          "password",
          "date",
          "dropdown",
          "yesno",
          "rating",
          "slider",
          "phone",
          "file",
          "image",
          "video",
           "signature",
           "scanner",
           "task",
        ];
        if (sidebarItems.includes(active.id)) {
          addFieldHandler(
            active.id,
            fields,
            setFields,
            currentStep,
            stepFields
          );
          return;
        }
        if (active.id !== over.id) {
          setFields((prev) => {
            const oldIndex =
            prev.findIndex((f) => f.id === active.id);
            const newIndex =
            prev.findIndex((f) => f.id === over.id);
             return arrayMove(prev, oldIndex, newIndex);
          });
        }
        setActiveField(null);
      };