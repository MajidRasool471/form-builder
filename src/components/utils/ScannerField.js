import React, {useState,useRef} from "react";
import { Html5Qrcode} from "html5-qrcode";
const ScannerField = ({ onScan}) => {
    const scannerRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);
    const readerId = "qr-reader";
     const startScanner = async () => {
        if (scannerRef.current || isScanning) return;
        setIsScanning(true);
        setTimeout(async () => {

        const scanner = new
        Html5Qrcode(readerId);
          scannerRef.current = scanner;
          try {
            await scanner.start(
                {facingMode:
                "environment"},
                  {
                    fps: 10,
                    qrbox: 250,
                },
                (decodedText) => {
                    onScan(decodedText);
                    stopScanner();
                },
                () => {}
            );
            setIsScanning(true);
        } catch (err) {
            console.log(err);
        }
    }, 300);
    };
    const stopScanner = async () => {
        if (!scannerRef.current) return;
        try {
            await scannerRef.current.stop().catch(() => {});
            await 
            scannerRef.current.clear().catch(() => {});
        } catch (err) {

        }
        scannerRef.current = null;
        setIsScanning(false);
    };
    return (
        <div className="border rounded-lg p-3 bg-white w-full max-w-md mx-auto space-y-4">
            {!isScanning ? (
                <button 
                onClick={startScanner}
                className="w-full text-white py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-xl hover:scale-[1.03]">
                    StartScanner
                </button>
            ) : (
                <>
                 <div id={readerId}
            style={{ width: "100%"}}></div>
                <button 
                onClick={stopScanner}
                className="w-full text-white py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-xl hover:scale-[1.03]">
                    StopScanner
                </button>
                </>
            )}
        </div>
    );
};
export default ScannerField;