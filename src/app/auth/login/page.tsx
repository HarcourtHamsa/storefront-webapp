'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/button/button'
import CustomInput from '@/components/input/input'
import Logo from '@/components/logo/logo'
import { login } from '@/utils/login'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { handleLogin } from '@/app/actions/auth/login'
import ToastNotification from '@/components/toast-notification'
import { toast } from 'react-toastify';

function LoginPage() {
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: (e: FormEvent) => {
            e.preventDefault();
            return handleLogin({
                email_address: emailAddress,
                password: password
            })
        },
        onSuccess: async () => {
            toast.success('Login successful')

            setTimeout(() => {
                router.push('/dashboard')
            }, 1000 * 2);
        },
        onError: async (error) => {
            toast.error('Invalid credentials')
        }

    })

    return (
        <div className='bg-white md:bg-gray-200 min-h-screen min-w-screen flex md:justify-start justify-center items-center'>
            <div className='md:p-8 w-full'>
                <ToastNotification />
                <div className='w-[100%] md:w-[400px] min-h-[500px] md:bg-white md:border-t-4 md:border-t-[#0C4C3B] p-4'>
                    <div className='w-fit m-auto mb-4'>
                        <Logo />
                    </div>
                    <h1 className='m-auto w-fit'>Sign in to continue</h1>

                    <div className="form-input mb-4 mt-6">
                        <CustomInput
                            placeholder='Email address'
                            type='email'
                            name='emailAddress'
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>

                    <div className="form-input mb-8">
                        <CustomInput
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        isLoading={mutation.isPending}
                        label='Sign in'
                        onClick={mutation.mutate}
                    />

                    <p className='m-auto w-fit py-4 text-sm'>
                        <Link href={'/fogort-password'} title='Fogort Password' className='pb-2 '>
                            Forgot your password?
                        </Link>
                    </p>
                    <p className='m-auto w-fit text-sm'>
                        Don&apos;t have an account?
                        <Link href={'/auth/register'} title='Fogort Password' className='pb-2 text-[#6889FD]'>
                            {" "}Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage