import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/lib/hooks/useFirestore';

// Define the shape of an applicant
interface Applicant {
  userId: string;
  text: string;
  stackBlitzLink: string;
  approved?: boolean;
  email: string;
}

// Define the shape of a task
interface Task {
  id: string;
  taskName: string;
  closed: boolean;
  approvedApplicant?: string;
  applications: Applicant[];
}

// Define the props for the component
interface ApplicantManagementProps {
  tasks: Task[];
  onUpdate: () => void;
}

export default function ApplicantManagement({ tasks, onUpdate }: ApplicantManagementProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { handleUpdateTask } = useFirestore();

  const handleApprove = async (taskId: string, applicantId: string) => {
    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        closed: true,
        approvedApplicant: applicantId,
        applications: selectedTask.applications.map(app =>
          app.userId === applicantId ? { ...app, approved: true } : app
        ),
      };
      await handleUpdateTask(taskId, updatedTask);
      onUpdate();
    }
  };

  const handleReject = async (taskId: string, applicantId: string) => {
    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        applications: selectedTask.applications.filter(app => app.userId !== applicantId),
      };
      await handleUpdateTask(taskId, updatedTask);
      onUpdate();
    }
  };

  const sendSelectionEmail = (applicant: Applicant) => {
    // Implement email sending logic here
    console.log(`Sending selection email to ${applicant.email}`);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Applicant Management</CardTitle>
      </CardHeader>
      <CardContent>
        <select onChange={(e) => setSelectedTask(tasks.find(t => t.id === e.target.value) || null)}>
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