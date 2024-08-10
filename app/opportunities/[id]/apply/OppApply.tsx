'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../../../lib/firebase/initFirebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import sdk from '@stackblitz/sdk';
import { javascriptProject } from './javascriptTemplate';

const OpportunityApply = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const [chatHistory, setChatHistory] = useState([]);
  const [textSubmission, setTextSubmission] = useState('');
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [stackBlitzProjectId, setStackBlitzProjectId] = useState('');

  useEffect(() => {
    const embedProject = async () => {
      try {
        const vm = await sdk.embedProject('stackblitz-container', javascriptProject, {
          height: 500,
          openFile: 'index.js',
        });
        
        const dependencies = await vm.getDependencies();
        if (dependencies && 'id' in dependencies) {
          setStackBlitzProjectId(dependencies.id);
        }
      } catch (error) {
        console.error('Error embedding StackBlitz project:', error);
      }
    };

    embedProject();
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      alert('You need to be logged in to submit an application.');
      return;
    }

    setSubmitting(true);

    const db = getFirestore(app);
    const storage = getStorage(app);
    const docRef = doc(db, 'tasks', id as string);

    let designUrl = '';

    if (designFile) {
      const storageRef = ref(storage, `designs/${id}/${user.uid}/${designFile.name}`);
      await uploadBytes(storageRef, designFile);
      designUrl = await getDownloadURL(storageRef);
    }

    const application = {
      userId: user.uid,
      text: textSubmission,
      stackBlitzProjectId: stackBlitzProjectId,
      designUrl,
      createdAt: new Date(),
    };

    try {
      await updateDoc(docRef, {
        applications: arrayUnion(application),
      });

      // Update user's document with the application
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        applications: arrayUnion({
          opportunityId: id,
          stackBlitzProjectId: stackBlitzProjectId,
          createdAt: new Date(),
        }),
      });

      alert('Application submitted successfully!');
      router.push(`/opportunities/${id}`);
    } catch (error: any) {
      console.error('Error submitting application: ', error);
      alert('Error submitting application: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Apply for Opportunity</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="textSubmission" className="block text-sm font-medium text-gray-700">
              Text Submission
            </label>
            <textarea
              id="textSubmission"
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Code Submission (StackBlitz)
            </label>
            <div id="stackblitz-container" className="mt-1 w-full h-[500px] border rounded-md overflow-hidden"></div>
            <button
              onClick={() => window.open(`https://stackblitz.com/edit/${stackBlitzProjectId}`, '_blank')}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Open StackBlitz in Full Screen
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="designFile" className="block text-sm font-medium text-gray-700">
              Design Submission
            </label>
            <input
              type="file"
              id="designFile"
              onChange={(e) => setDesignFile(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityApply;
