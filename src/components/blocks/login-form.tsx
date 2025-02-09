import { useState } from 'react';
import { useAuth } from '@altanlabs/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
          title: 'Registration successful',
          description: 'Your account has been created.'
        });
      } else {
        await login({ email, password });
        toast({
          title: 'Login successful',
          description: 'Welcome back!'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: isRegistering ? 'Registration failed.' : 'Login failed.',
        variant: 'destructive'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-black bg-white dark:bg-gray-800"
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black bg-white dark:bg-gray-800"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        {isRegistering ? 'Register' : 'Login'}
      </Button>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsRegistering(!isRegistering)}
        className="w-full mt-2"
      >
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </Button>
    </form>
  );
}