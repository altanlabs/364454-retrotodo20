import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@altanlabs/auth';
import { useDatabase } from '@altanlabs/database';
import { useToast } from '@/hooks/use-toast';

interface Todo {
  id: string;
  fields: {
    title: string;
    completed: boolean;
    user_id: string[];
  };
}

export function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    records: todos,
    addRecord,
    modifyRecord,
    removeRecord,
    refresh
  } = useDatabase('todos');

  useEffect(() => {
    if (user) {
      refresh({
        filters: [{ field: 'user_id', operator: 'eq', value: user.id }],
        sort: [{ field: 'created_at', direction: 'desc' }]
      });
    }
  }, [user]);

  const addTodo = async () => {
    if (!newTodo.trim() || !user) return;
    try {
      await addRecord({
        title: newTodo,
        completed: false,
        user_id: [user.id]
      });
      setNewTodo('');
      toast({
        title: 'Todo added',
        description: 'Your new todo has been created.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add todo.',
        variant: 'destructive'
      });
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      await modifyRecord(todo.id, {
        completed: !todo.fields.completed
      });
      toast({
        title: 'Todo updated',
        description: todo.fields.completed ? 'Todo marked as incomplete.' : 'Todo marked as complete.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update todo.',
        variant: 'destructive'
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await removeRecord(id);
      toast({
        title: 'Todo deleted',
        description: 'Your todo has been removed.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete todo.',
        variant: 'destructive'
      });
    }
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
          {todos.map((todo: Todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 border-2 border-black"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={todo.fields.completed}
                  onCheckedChange={() => toggleTodo(todo)}
                  className="border-2 border-black"
                />
                <span className={todo.fields.completed ? 'line-through' : ''}>
                  {todo.fields.title}
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