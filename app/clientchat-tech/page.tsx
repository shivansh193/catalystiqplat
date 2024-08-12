'use client';

import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Switch } from '@headlessui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatTechProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ClientChatTech: React.FC<ChatTechProps> = ({ chatHistory, setChatHistory }) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  
  const [response, setResponse] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const prompt = `You are an AI Agent designed to fit into various hats as an assistant... Your current prompt on what you have to assist the user to do is ${currentPrompt}`;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const userMessage: ChatMessage = { role: 'user', content: currentPrompt };
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);

    const fullPrompt = [...chatHistory, userMessage]
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    const result = await model.generateContent(fullPrompt);
    const text = await result.response.text();

    const aiMessage: ChatMessage = { role: 'assistant', content: text };
    setChatHistory((prevHistory) => [...prevHistory, aiMessage]);

    setResponse(text);
    setCurrentPrompt('');
  }

  function clearChat() {
    setChatHistory([]);
    setResponse('');
    setCurrentPrompt('');
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const code = String(children).replace(/\n$/, '');

    if (!inline) {
      return (
        <div className="relative">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-t-md p-2 flex justify-between items-center">
            <span className="text-sm font-mono">{language || 'Code'}</span>
            <button
              onClick={() => copyToClipboard(code)}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Copy
            </button>
          </div>
          <pre className="p-4 border border-gray-300 dark:border-gray-700 rounded-b-md bg-gray-50 dark:bg-gray-800 overflow-auto">
            <code className={className} {...props}>
              {code}
            </code>
          </pre>
        </div>
      );
    }
    return <code className={className} {...props}>{children}</code>;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="mb-6">
        <Switch
          checked={isDarkMode}
          onChange={setIsDarkMode}
          className={`${
            isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4 max-h-96 overflow-y-auto">
          {chatHistory.map((message, index) => (
            <div key={index} className={`mt-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  components={{code: CodeBlock}}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            placeholder="Enter Prompt here"
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default ClientChatTech;
