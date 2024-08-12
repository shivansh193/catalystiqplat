'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircle2 } from 'lucide-react'

export default function OrganisationTask({ formData, setFormData }: { formData: any, setFormData: (data: any) => void }) {
    const [task, setTask] = useState(formData.taskName || '')
    const [numTasks, setNumTasks] = useState(5)
    const [suggestedTasks, setSuggestedTasks] = useState<Array<{ text: string; completed: boolean }>>(formData.subtasks || [])
    const [isLoading, setIsLoading] = useState(false)
    const [customTask, setCustomTask] = useState('')

    const generateAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

    useEffect(() => {
        const completedSubtasks = suggestedTasks.filter(task => task.completed)
        setFormData({
            ...formData,
            taskName: task,
            subtasks: completedSubtasks
        })
    }, [task, suggestedTasks])

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

            const tasks = text.split('\n').filter(t => t.trim() !== '').map(t => ({
                text: t.replace(/^\d+\.\s*/, ''),
                completed: false
            }))
            setSuggestedTasks(tasks)
        } catch (error) {
            console.error('Error generating tasks:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddCustomTask = () => {
        if (customTask.trim() !== '') {
            const updatedTasks = [...suggestedTasks, { text: customTask, completed: false }]
            setSuggestedTasks(updatedTasks)
            setCustomTask('')
        }
    }

    const toggleTaskCompletion = (index: number) => {
        const updatedTasks = [...suggestedTasks]
        updatedTasks[index].completed = !updatedTasks[index].completed
        setSuggestedTasks(updatedTasks)
    }

    return (
        <div className="container mx-auto p-4">
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
                        <ul className="space-y-2">
                            {suggestedTasks.map((subtask, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`task-${index}`}
                                        checked={subtask.completed}
                                        onCheckedChange={() => toggleTaskCompletion(index)}
                                    />
                                    <label
                                        htmlFor={`task-${index}`}
                                        className={`flex-grow ${subtask.completed ? 'line-through text-gray-500' : ''}`}
                                    >
                                        {subtask.text}
                                    </label>
                                    {subtask.completed && <CheckCircle2 className="text-green-500" size={16} />}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 space-y-2">
                            <Input
                                type="text"
                                placeholder="Add a custom task"
                                value={customTask}
                                onChange={(e) => setCustomTask(e.target.value)}
                                className="w-full"
                            />
                            <Button onClick={handleAddCustomTask} className="w-full">
                                Add Custom Task
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}