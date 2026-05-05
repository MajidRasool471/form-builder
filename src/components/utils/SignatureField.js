import React, {useRef, useState, useEffect} from "react";
import {startDrawing, stopDrawing, drawSignature, clearSignature, loadSignature} from "./SignatureHelper";

const SignatureField =({ onChange}) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        loadSignature(canvasRef);
    }, []);
 
    const handleStop = () => {
        stopDrawing(setIsDrawing, canvasRef);
        const canvas = canvasRef.current;
        if (canvas && onChange) {
            onChange(canvas.toDataURL());
        }
    };
       return (
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-3 bg-gray-50">
               <canvas 
                    ref={canvasRef}
                    width={300}
                    height={150}
                    className="w-full bg-white rounded border cursor-crosshair" 
                    style={{ touchAction: "none"}}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                      startDrawing(e, setIsDrawing, canvasRef)
                    }}
                     onMouseMove={(e) =>
                      drawSignature(e, isDrawing, canvasRef)
                    }
                    onMouseup={handleStop}
                    onMouseLeave={handleStop}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                      
                      startDrawing(e, setIsDrawing, canvasRef)
                    }}
                     onTouchMove={(e) => {
                        e.preventDefault();
                      drawSignature(e, isDrawing, canvasRef)
                    }}
                    onTouchEnd={handleStop}
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
                 );
                 };
                 export default SignatureField;