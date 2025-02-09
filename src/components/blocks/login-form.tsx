import { useState } from 'react';
import { useAuth } from '@altanlabs/auth';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register({ email, password });
        toast({
          title: '🎮 Player Created!',
          description: 'Ready Player One!'
        });
      } else {
        await login({ email, password });
        toast({
          title: '🕹️ Game On!',
          description: 'Welcome back, player!'
        });
      }
    } catch (error) {
      toast({
        title: '❌ Game Over',
        description: isRegistering ? 'Failed to create player.' : 'Invalid credentials.',
        variant: 'destructive'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full font-mono text-sm"
          required
        />
      </div>
      <div className="space-y-2">
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full font-mono text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-black text-white font-mono text-sm border-2 border-black hover:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
      >
        {isRegistering ? 'CREATE PLAYER' : 'START GAME'}
      </button>
      <button
        type="button"
        onClick={() => setIsRegistering(!isRegistering)}
        className="w-full mt-2 py-2 font-mono text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
      >
        {isRegistering ? '← BACK TO LOGIN' : 'NEW PLAYER? →'}
      </button>
    </form>
  );
}