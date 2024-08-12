"use client";

import { useState } from 'react';
import { signInWithGoogle } from '../../lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../lib/firebase/initFirebase';


const steps = ['Login', 'Organization Info', 'Signer Details', 'Organization Purpose', 'Documents'];

export default function OrgSignup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<{
    orgName: string;
    orgEmail: string;
    orgWebsite: string;
    orgSize: string;
    signerName: string;
    signerEmail: string;
    signerPhone: string;
    signerRole: string;
    orgDescription: string;
    orgIndustry: string;
    purpose: string;
    documents: string[];
  }>({
    orgName: '',
    orgEmail: '',
    orgWebsite: '',
    orgSize: '',
    signerName: '',
    signerEmail: '',
    signerPhone: '',
    signerRole: '',
    orgDescription: '',
    orgIndustry: '',
    purpose: '',
    documents: [],
  });
  const router = useRouter();

  const uploadToFirestore = async (data: any) => {
    try {
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, 'orgs'), data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setCurrentStep(1);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    if (url) {
      setFormData(prevData => ({
        ...prevData,
        documents: [...prevData.documents, url]
      }));
    }
  };

  const handleNextStep = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        // Submit the form data
        console.log('Form submitted:', formData);
        const orgId = await uploadToFirestore(formData);
        console.log('Organization added with ID:', orgId);
        router.push('/orgdashboard'); // Redirect to dashboard or appropriate page
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2>Login with Google</h2>
            <button onClick={handleGoogleSignIn} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Google Sign-In
            </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Organization Information</h2>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleInputChange}
              placeholder="Organization Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="orgEmail"
              value={formData.orgEmail}
              onChange={handleInputChange}
              placeholder="Organization Email"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="orgWebsite"
              value={formData.orgWebsite}
              onChange={handleInputChange}
              placeholder="Organization Website"
              className="w-full px-3 py-2 border rounded"
            />
            <select
              name="orgSize"
              value={formData.orgSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Organization Size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501+">501+ employees</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Signer Details</h2>
            <input
              type="text"
              name="signerName"
              value={formData.signerName}
              onChange={handleInputChange}
              placeholder="Signer's Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="email"
              name="signerEmail"
              value={formData.signerEmail}
              onChange={handleInputChange}
              placeholder="Signer's Email"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="tel"
              name="signerPhone"
              value={formData.signerPhone}
              onChange={handleInputChange}
              placeholder="Signer's Phone Number"
              className="w-full px-3 py-2 border rounded"
            />
            <select
              name="signerRole"
              value={formData.signerRole}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Signer&apos;s Role</option>
              <option value="CEO">CEO</option>
              <option value="CTO">CTO</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Other">Other</option>
            </select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Organization Purpose</h2>
            <textarea
              name="orgDescription"
              value={formData.orgDescription}
              onChange={handleInputChange}
              placeholder="Tell us a little bit about what you do"
              className="w-full px-3 py-2 border rounded"
              rows={4}
            />
            <input
              type="text"
              name="orgIndustry"
              value={formData.orgIndustry}
              onChange={handleInputChange}
              placeholder="Organization Industry"
              className="w-full px-3 py-2 border rounded"
            />
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">What brings you here?</option>
              <option value="Exploring">Exploring</option>
              <option value="Hiring Talent">Hiring Talent</option>
              <option value="Others">Others</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Documents</h2>
            <p>Enter URLs for documents you want your applicants to see</p>
            <input
              type="url"
              onChange={handleUrlChange}
              placeholder="Enter document URL"
              className="w-full px-3 py-2 border rounded"
            />
            <ul>
              {formData.documents.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Organization Signup</h1>
        <div className="mb-4">
          {steps.map((step, index) => (
            <span
              key={step}
              className={`inline-block px-2 py-1 mr-2 rounded ${
                index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
        {renderStep()}
        {currentStep > 0 && (
          <button
            onClick={handleNextStep}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}