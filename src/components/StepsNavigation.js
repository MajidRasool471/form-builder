import {Button} from "antd";
function StepsNavigation({
    currentStep,
    setCurrentStep,
    submitStep,
}) {
    return (
        <div className="flex items-center mt-6 ">
            {currentStep > 0 && (
            <Button 
            onClick={() =>
                setCurrentStep((prev) => prev -1)
            }>
                Preview
            </Button>
            )}
            {currentStep !== submitStep && (
            <div className="ml-auto">
            <Button 
            type="primary"
            className="text-white bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-xl hover:scale-[1.03]"
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