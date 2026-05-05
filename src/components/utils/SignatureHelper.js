export const startDrawing = (e,
    setIsDrawing, canvasRef
) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect =
    canvas.getBoundingClientRect();
    const x = e.touches
    ? e.touches[0].clientX - rect.left
    : e.clientX - rect.left
     const y = e.touches
    ? e.touches[0].clientyY- rect.top
    : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
};
export const drawSignature = (e,
    isDrawing, canvasRef
) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return
    const ctx = canvas.getContext("2d");
      const rect =
    canvas.getBoundingClientRect();
      const x = e.touches
    ? e.touches[0].clientX - rect.left
    : e.clientX - rect.left;
     const y = e.touches
    ? e.touches[0].clientyY- rect.top
    : e.clientY - rect.top;
    ctx.linewidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
  ctx.lineTo(x, y)
  ctx.stroke();
};
export const stopDrawing = (
   setIsDrawing, canvasRef,onChange
) => {
    setIsDrawing(false);
      const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    localStorage.setItem("signature", dataUrl);
    if (onChange) {
        onChange(dataUrl);
    }
};
export const loadSignature =
(canvasRef) => {
      const canvas = canvasRef.current;
    if (!canvas) return;
    const saved =
     localStorage.getItem("signature");
     if (!saved) return;
     const ctx = canvas.getContext("2d");
     const img = new Image();
     img.src = saved;
     img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
     };
};
 export const clearSignature =
 (canvasRef, onChange) => {
      const canvas = canvasRef.current;
    if (!canvas) return;
     const ctx = canvas.getContext("2d");
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       localStorage.removeItem("signature");
         if (onChange) {
        onChange("");
    }
 };