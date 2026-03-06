import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <main className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="font-playfair text-3xl text-white-primary text-center mb-2">Admin Login</h1>
        <p className="text-white-muted text-center text-sm mb-8">
          Staff access only. Contact admin for credentials.
        </p>

        <form
          onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            try {
              const res = await login(data.email, data.password);
              setUser(res.data.user);
              toast.success('Welcome back');
              navigate('/admin');
            } catch (err) {
              toast.error(err.response?.data?.message || 'Login failed');
            } finally {
              setLoading(false);
            }
          })}
          className="space-y-4 bg-black-card border border-black-border rounded-lg p-8"
        >
          <div>
            <label className="block text-sm text-white-muted mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 bg-black-primary border border-black-border rounded-lg text-white-primary"
            />
            {errors.email && <p className="text-red-accent text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 bg-black-primary border border-black-border rounded-lg text-white-primary"
            />
            {errors.password && <p className="text-red-accent text-sm mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-white-subtle text-center text-sm mt-6">
          Don&apos;t have access? Contact the administrator.
        </p>
      </div>
    </main>
  );
}
