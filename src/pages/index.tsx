import { useAuth } from '@altanlabs/auth';
import { LoginForm } from '@/components/blocks/login-form';
import { TodoList } from '@/components/blocks/todo-list';

export default function IndexPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 font-mono">
          Retro Todo App
        </h1>
        
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="text-center mb-4 font-mono">
              Welcome, {user?.email}!
            </div>
            <TodoList />
          </div>
        ) : (
          <div className="bg-[#f0f0f0] dark:bg-[#2a2a2a] border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 text-center font-mono">Login</h2>
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}