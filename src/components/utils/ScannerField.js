import React, {useEffect} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
const ScannerField = ({ onScan}) => {
    useEffect(() => {
        const scanner = new
        Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: 250,
            },
            false
        );
        scanner.render(
            (decodedText) => {
                onScan(decodedText);
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            scanner.clear().catch((error) => {
                console.log(error);
            });
        };
    }, [onScan]);
    return (
        <div className="border rounded-lg p-3 bg-white">
            <div id="reader" style={{width: "300px"}}></div>
        </div>
    );
};
export default ScannerField;