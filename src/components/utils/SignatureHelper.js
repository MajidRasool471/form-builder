export const startDrawing = (
    setIsDrawing,
    canvasRef
) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
};
export const stopDrawing = (
    setIsDrawing,
    canvasRef
) => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    localStorage.setItem(
        "signature",
        canvas.toDataURL()
    );
};
 export const drawSignature = (
    e,
    isDrawing,
    canvasRef,
 ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";
         ctx.lineTo(
        e.nativeEvent.offsetX,
         e.nativeEvent.offsetY,
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
    );
 };
 export const clearSignature = (
    canvasRef
 ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    localStorage.removeItem(
        "signature"
    );
 };
 export const loadSignature = (
    canvasRef
 ) => {
    const savedSignature =
    localStorage.getItem(
        "signature"
    );
    if (!savedSignature) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = savedSignature;
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
    };
 };