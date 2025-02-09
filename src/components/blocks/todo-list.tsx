import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@altanlabs/auth';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const { user } = useAuth();

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Card className="w-full max-w-md p-6 bg-[#f0f0f0] dark:bg-[#2a2a2a] border-4 border-[#000000] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="retro-input border-2 border-black bg-white dark:bg-gray-800"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button
            onClick={addTodo}
            className="bg-[#000000] text-white hover:bg-[#333333] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Add
          </Button>
        </div>
        
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 border-2 border-black"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="border-2 border-black"
                />
                <span className={todo.completed ? 'line-through' : ''}>
                  {todo.title}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={() => deleteTodo(todo.id)}
                className="h-8 px-2 text-red-500 hover:text-red-700"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}