import React, {useEffect,useRef} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
const ScannerField = ({ onScan}) => {
    const scannerRef = useRef(null);
    const readerId = useRef(`reader-${Date.now()}`);
    useEffect(() => {
        if (scannerRef.current)  {
              scannerRef.current.clear().catch(() => {});
                scannerRef.current = null;
        }
        const scanner = new
        Html5QrcodeScanner(
            readerId.current,
            {
                fps: 10,
                qrbox: 250,
            },
            false
        );
        scannerRef.current = scanner;
        window.currentScanner = scanner;
        scanner.render(
            (decodedText) => {
                onScan(decodedText);
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(() => {});
                scannerRef.current = null;
                window.currentScanner = null;
            }
        };
    }, [onScan]);
    return (
        <div className="border rounded-lg p-3 bg-white">
            <div id={readerId.current} style={{width: "300px"}}></div>
        </div>
    );
};
export default ScannerField;