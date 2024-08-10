import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FinancialSummary({ tasks }) {
  const totalBudget = tasks.reduce((sum, task) => sum + parseFloat(task.budget), 0);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total money given out: ${totalBudget.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}