"use client"

import { useState } from "react";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/Radio'

const workTypes = [
  { name: 'Marketing', color: 'bg-blue-500' },
  { name: 'Design', color: 'bg-green-500' },
  { name: 'Development', color: 'bg-red-500' },
  { name: 'Writing', color: 'bg-yellow-500' },
  { name: 'Research', color: 'bg-purple-500' },
]

export default function DescriptionStep({ formData, setFormData }: { formData: any, setFormData: (data: any) => void }) {
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>(formData.workTypes || []);

  const toggleWorkType = (workType: string) => {
    setSelectedWorkTypes(prev => 
      prev.includes(workType) 
        ? prev.filter(type => type !== workType)
        : [...prev, workType]
    );
    setFormData({...formData, workTypes: selectedWorkTypes});
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Task Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <Input
        type="number"
        placeholder="Budget"
        value={formData.budget}
        onChange={(e) => setFormData({...formData, budget: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <Input
        type="date"
        placeholder="Deadline"
        value={formData.deadline}
        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
        className="w-full p-2 border rounded"
      />
      
      <div className="space-y-2">
        <Label>Work Types:</Label>
        <div className="flex flex-wrap gap-2">
          {workTypes.map((type) => (
            <Button
              key={type.name}
              onClick={() => toggleWorkType(type.name)}
              className={`${type.color} text-white ${selectedWorkTypes.includes(type.name) ? 'ring-2 ring-offset-2 ring-black' : ''}`}
            >
              {type.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Task Type:</Label>
        <RadioGroup 
          value={formData.isAIOnly ? "ai" : "regular"} 
          onValueChange={(value: any) => setFormData({...formData, isAIOnly: value === "ai"})}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular" id="regular" />
            <Label htmlFor="regular">Regular Task</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai">AI-Only Task (Prompting)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}