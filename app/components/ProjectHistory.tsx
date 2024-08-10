import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectHistory({ tasks }) {
  const projectTypes = [...new Set(tasks.map(task => task.workTypes).flat())];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Project History</CardTitle>
      </CardHeader>
      <CardContent>
        <h3>Types of projects given:</h3>
        <ul>
          {projectTypes.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}