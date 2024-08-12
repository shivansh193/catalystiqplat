import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TaskList({ tasks }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>All Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.taskName}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}