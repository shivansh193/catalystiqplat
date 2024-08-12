import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/lib/hooks/useFirestore';

export default function ApplicantManagement({ tasks, onUpdate }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const { handleUpdateTask } = useFirestore();

  const handleApprove = async (taskId, applicantId) => {
    const updatedTask = {
      ...selectedTask,
      closed: true,
      approvedApplicant: applicantId,
      applications: selectedTask.applications.map(app => 
        app.userId === applicantId ? { ...app, approved: true } : app // Mark the approved applicant
      ),
    };
    await handleUpdateTask(taskId, updatedTask);
    onUpdate();
};

const handleReject = async (taskId, applicantId) => {
    const updatedTask = {
      ...selectedTask,
      applications: selectedTask.applications.filter(app => app.userId !== applicantId), // Remove rejected applicant
    };
    await handleUpdateTask(taskId, updatedTask);
    onUpdate();
};

  const sendSelectionEmail = (applicant) => {
    // Implement email sending logic here
    console.log(`Sending selection email to ${applicant.email}`);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Applicant Management</CardTitle>
      </CardHeader>
      <CardContent>
        <select onChange={(e) => setSelectedTask(tasks.find(t => t.id === e.target.value))}>
          <option value="">Select a task</option>
          {tasks.filter(task => !task.closed).map((task) => (
            <option key={task.id} value={task.id}>{task.taskName}</option>
          ))}
        </select>
        {selectedTask && (
          <div>
            <h3>Applicants for {selectedTask.taskName}</h3>
            {selectedTask.applications.map((applicant) => (
              <div key={applicant.userId}>
                <p>{applicant.text} - {applicant.stackBlitzLink}</p>
                <Button onClick={() => handleApprove(selectedTask.id, applicant.userId)}>Approve</Button>
                <Button onClick={() => handleReject(selectedTask.id, applicant.userId)}>Reject</Button>
                {selectedTask.approvedApplicant === applicant.userId && (
                  <Button onClick={() => sendSelectionEmail(applicant)}>Send Selection Email</Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}