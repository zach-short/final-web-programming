'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GalleryVerticalEnd, ArrowLeft } from 'lucide-react';
import { authApi } from '@/lib/api';

type AuthStep = 'providers' | 'email' | 'password';

interface UnifiedAuthFormProps {
  className?: string;
}

export function UnifiedAuthForm({
  className,
  ...props
}: UnifiedAuthFormProps & React.ComponentPropsWithoutRef<'div'>) {
  const [step, setStep] = useState<AuthStep>('providers');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialAuth = async (provider: 'google') => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      console.error('Social auth error:', error);
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { exists } = await authApi.checkEmail(email);
      setStep('password');
    } catch (error) {
      console.error('Email check error:', error);
      setStep('password');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const password = formData.get('password') as string;

    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        try {
          await authApi.register({ email, password });
          await signIn('credentials', {
            email,
            password,
            callbackUrl: '/dashboard',
          });
        } catch (registerError) {
          console.error('Registration error:', registerError);
        }
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetToProviders = () => {
    setStep('providers');
    setEmail('');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            {step === 'providers' && 'Welcome'}
            {step === 'email' && 'Enter your email'}
            {step === 'password' && 'Enter your password'}
          </CardTitle>
          <CardDescription>
            {step === 'providers' && 'Continue with your preferred method'}
            {step === 'email' && "We'll check if you have an account"}
            {step === 'password' && `Continue as ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'providers' && (
            <div className='grid gap-6'>
              <div className='flex flex-col gap-4'>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='size-4'
                  >
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
              <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                  or
                </span>
              </div>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => setStep('email')}
                disabled={isLoading}
              >
                Continue with Email
              </Button>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className='grid gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email address</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className='flex gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={resetToProviders}
                  disabled={isLoading}
                >
                  <ArrowLeft className='size-4' />
                </Button>
                <Button
                  type='submit'
                  className='flex-1'
                  disabled={isLoading || !email}
                >
                  {isLoading ? 'Checking...' : 'Continue'}
                </Button>
              </div>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className='grid gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  required
                  autoFocus
                />
              </div>
              <div className='flex gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={() => setStep('email')}
                  disabled={isLoading}
                >
                  <ArrowLeft className='size-4' />
                </Button>
                <Button type='submit' className='flex-1' disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Continue'}
                </Button>
              </div>
              <div className='text-center'>
                <button
                  type='button'
                  className='text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline'
                  onClick={resetToProviders}
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function UnifiedAuth() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center font-medium'>
          <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          RONR
        </a>
        <UnifiedAuthForm />
      </div>
    </div>
  );
}
