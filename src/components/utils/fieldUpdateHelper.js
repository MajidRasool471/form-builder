 export const removeFieldHandler = (id,
    fields,
    setFields,
    selectedField,
    setSelectedField
 ) => {
    const newFields =
    fields.filter((f) => f.id !== id);
    setFields(newFields);
    if (selectedField &&
      selectedField.id === id) {
         setSelectedField(null);
      }
  };
    export const changeLabelHandler = (id,
         value,
        fields,
        setFields,
        selectedField,
        setSelectedField
    ) => {
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
     export const toggleRequiredHandler =(id,
         fields,
        setFields,
        selectedField,
        setSelectedField
     ) => {
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
       export const changePlaceholderHandler = (id,
         value,
          fields,
        setFields,
         selectedField,
        setSelectedField
        ) => {
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