import {Button} from "antd";
function StepsNavigation({
    currentStep,
    setCurrentStep,
}) {
    return (
        <div className="flex justify-between mt-6">
            <Button 
            disabled={currentStep === 0}
            onClick={() =>
                setCurrentStep((prev) => prev -1)
            }>
                Preview
            </Button>
            <Button 
            type="primary"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => 
                setCurrentStep((prev) => prev + 1)
            }
            >
                Next Step
            </Button>
        </div>
    );
}
 export default StepsNavigation;