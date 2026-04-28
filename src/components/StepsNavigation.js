import {Button} from "antd";
function StepsNavigation({
    currentStep,
    setCurrentStep,
}) {
    return (
        <div className="flex items-center mt-6">
            {currentStep > 0 && (
            <Button 
            onClick={() =>
                setCurrentStep((prev) => prev -1)
            }>
                Preview
            </Button>
            )}
            {currentStep < 4 && (
            <div className="ml-auto">
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
            )}
        </div>
    );
}
 export default StepsNavigation;