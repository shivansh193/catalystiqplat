'use client'
import { useState } from "react";
import DescriptionStep from "../components/descriptionStep";
import SubTaskGen from "../components/subTaskGen";
import { Dispatch, SetStateAction } from "react";

interface FormData {
  taskName: string;
  subtasks: never[];
  description: string;
  budget: string;
  deadline: string;
}

interface StepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function OrgTask() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    taskName: '',
    subtasks: [],
    description: '',
    budget: '',
    deadline: ''
  });

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log(formData);
  };

  function Navigation({step, setStep, formData}: any) {
    return (
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </button>
        )}
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organization Task</h1>
      {step === 1 && <SubTaskGen formData={formData} setFormData={setFormData} />}
      {step === 2 && <DescriptionStep formData={formData} setFormData={setFormData} />}
      <Navigation step={step} setStep={setStep} formData={formData} />
    </div>
  );
}