import { useState } from 'react';
import { useAuth } from '@altanlabs/auth';
import { useToast } from '../../hooks/use-toast';

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
          title: '🎮 NEW PLAYER',
          description: 'PLAYER CREATED!'
        });
      } else {
        await login({ email, password });
        toast({
          title: '🕹️ READY!',
          description: 'PLAYER 1 START!'
        });
      }
    } catch (error) {
      toast({
        title: '❌ GAME OVER',
        description: isRegistering ? 'CREATION FAILED' : 'LOGIN FAILED',
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
          className="w-full font-['Press_Start_2P'] text-xs"
          required
        />
      </div>
      <div className="space-y-2">
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full font-['Press_Start_2P'] text-xs"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-black text-white font-['Press_Start_2P'] text-xs border-2 border-black hover:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
      >
        {isRegistering ? 'CREATE PLAYER' : 'PRESS START'}
      </button>
      <button
        type="button"
        onClick={() => setIsRegistering(!isRegistering)}
        className="w-full mt-2 py-2 font-['Press_Start_2P'] text-xs text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
      >
        {isRegistering ? '← BACK' : 'NEW GAME →'}
      </button>
    </form>
  );
}