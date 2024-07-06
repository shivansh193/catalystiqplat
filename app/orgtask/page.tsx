'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function OrganisationTask() {
  const [task, setTask] = useState('')
  const [numTasks, setNumTasks] = useState(5)
  const [suggestedTasks, setSuggestedTasks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const model = generateAI.getGenerativeModel({ model: 'gemini-pro' })

      const prompt = `You are an expert hiring manager tasked with creating an assessment for a candidate. Given the following main task for an organization: "${task}"

      Generate a list of ${numTasks} smaller, essential assessment tasks that would help measure a candidate's capability for the main task. These tasks should be:
      
      1. Concise and specific
      2. Independent of each other
      3. Directly utilizing the essential skills needed for the main task
      4. Preferably unrelated to the main task if they are industry standard assessments
      5. Designed to be completed remotely
      
      For each task, include an estimated time limit and a difficulty level (Easy, Medium, Hard).
      
      Format your response as follows:
      - Present each task on a new line.
      - Do not use any markdown, bold text, or bullet points.
      - Separate the task description, difficulty level, and time limit with commas.
      - Do not include any additional explanations, justifications, or introductory text.
      
      Example output format:
      [Task 1], [Difficulty], [Time]
      [Task 2], [Difficulty], [Time]
      [Task 3], [Difficulty], [Time]
      ...and so on.
      
      Provide ONLY the tasks, without any introductory text or key skills description.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const tasks = text.split('\n').filter(t => t.trim() !== '').map(t => t.replace(/^\d+\.\s*/, ''))
      setSuggestedTasks(tasks)
    } catch (error) {
      console.error('Error generating tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organisation Task</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Generate Subtasks</CardTitle>
          <CardDescription>Enter a task and choose the number of subtasks to generate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter organisation task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <label htmlFor="numTasks" className="text-sm">Number of subtasks:</label>
              <Input
                id="numTasks"
                type="number"
                min="1"
                max="10"
                value={numTasks}
                onChange={(e) => setNumTasks(parseInt(e.target.value))}
                className="w-20"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Subtasks'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {suggestedTasks.length > 0 && (
        <Card className="mt-8 w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Suggested Subtasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {suggestedTasks.map((subtask, index) => (
                <li key={index}>{subtask}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}