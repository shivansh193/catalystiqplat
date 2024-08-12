import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFirestore } from '@/lib/hooks/useFirestore';

// Define the shape of a task
interface Task {
  id: string;
  taskName: string;
  closed: boolean;
  // Add other properties of task as needed
}

// Define the props for the component
interface ActiveOpportunitiesProps {
  tasks: Task[];
  onUpdate: () => void;
}

export default function ActiveOpportunities({ tasks, onUpdate }: ActiveOpportunitiesProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { handleUpdateTask } = useFirestore();

  const handleEdit = (task: Task) => {
    setEditingTask({ ...task });
  };

  const handleSave = async () => {
    if (editingTask) {
      await handleUpdateTask(editingTask.id, editingTask);
      setEditingTask(null);
      onUpdate();
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Active Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.filter(task => !task.closed).map((task) => (
          <div key={task.id} className="mb-4">
            {editingTask && editingTask.id === task.id ? (
              <div>
                <Input
                  value={editingTask.taskName}
                  onChange={(e) => setEditingTask({ ...editingTask, taskName: e.target.value })}
                />
                <Button onClick={handleSave}>Save</Button>
              </div>
            ) : (
              <div>
                <span>{task.taskName}</span>
                <Button onClick={() => handleEdit(task)}>Edit</Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}