import Button from '/components/ui/button';


export default function StepperControl({ handleClick, currentStep, steps }) {
    return (
      <div className="container mt-4 mb-8 flex justify-around">
        <Button shape="rounded" variant="solid" color="gray" 
         onClick={() => handleClick()}
         className={`bg-brand ${
            currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
          }`}
        >
            <span className='text-white'>
            Back
            </span>
          </Button>
  

          {/* {currentStep !== steps.length - 1 && */}
          
          <Button shape="rounded" variant="solid" color="gray" 
         onClick={() => handleClick("next")}
         className={`bg-brand `}
        >
            {/* Back */}
            <span className='text-white'>
            {currentStep === steps.length - 1 ? "Confirm" : "Next"}
            </span>
          </Button>
          {/* } */}
      </div>
    );
  }