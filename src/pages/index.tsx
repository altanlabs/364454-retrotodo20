import { useAuth } from '@altanlabs/auth';
import { LoginForm } from '@/components/blocks/login-form';
import { TodoList } from '@/components/blocks/todo-list';

export default function IndexPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-md mx-auto">
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="text-center mb-4 font-mono text-sm">
              Welcome back, {user?.email}! 🕹️
            </div>
            <TodoList />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl mb-6 text-center font-mono">
              🎮 Player Login
            </h2>
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}