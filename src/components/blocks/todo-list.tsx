import { useState, useEffect } from 'react';
import { useAuth } from '@altanlabs/auth';
import { useDatabase } from '@altanlabs/database';
import { useToast } from '../../hooks/use-toast';

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
    records: todos = [], // Provide default empty array
    addRecord,
    modifyRecord,
    removeRecord,
    refresh,
    isLoading
  } = useDatabase('todos');

  useEffect(() => {
    if (user) {
      refresh({
        filters: [{ field: 'user_id', operator: 'eq', value: user.id }],
        sort: [{ field: 'created_at', direction: 'desc' }]
      });
    }
  }, [user, refresh]);

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
        title: '🎮 QUEST ADDED',
        description: 'NEW MISSION ACQUIRED!'
      });
    } catch (error) {
      toast({
        title: '❌ GAME OVER',
        description: 'MISSION FAILED',
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
        title: todo.fields.completed ? '↩️ RESET' : '✨ COMPLETE',
        description: todo.fields.completed ? 'QUEST RESTARTED' : 'MISSION ACCOMPLISHED'
      });
    } catch (error) {
      toast({
        title: '❌ ERROR',
        description: 'SAVE FAILED',
        variant: 'destructive'
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await removeRecord(id);
      toast({
        title: '💥 DELETED',
        description: 'QUEST ABANDONED'
      });
    } catch (error) {
      toast({
        title: '❌ ERROR',
        description: 'DELETE FAILED',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="NEW QUEST..."
            className="flex-1 font-['Press_Start_2P'] text-xs"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-black text-white font-['Press_Start_2P'] text-xs border-2 border-black hover:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
          >
            ADD
          </button>
        </div>
        
        <div className="space-y-2">
          {isLoading ? (
            <div className="text-center font-['Press_Start_2P'] text-xs py-4">
              LOADING...
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center font-['Press_Start_2P'] text-xs py-4">
              NO QUESTS YET
            </div>
          ) : (
            todos.map((todo: Todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-[#f0f0f0] dark:bg-gray-700 border-2 border-black"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.fields.completed}
                    onChange={() => toggleTodo(todo)}
                    className="w-4 h-4 border-2 border-black cursor-pointer"
                  />
                  <span className={`font-['Press_Start_2P'] text-xs ${todo.fields.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.fields.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 font-['Press_Start_2P'] text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}