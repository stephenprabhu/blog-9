import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import LoadingButton from '../../Shared/LoadingButton';
import TextInput from '../../Shared/TextInput';

const Login = () => {
    const { data, setData, errors, post, processing } = useForm({
        email: 'cats@gmail.com',
        password: 'secret',
        remember: true
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
        <Head>
            <title>Login</title>
        </Head>
        <div className="w-full max-w-md">
            <div className='flex justify-center'>
                <img src="/images/writing.png" alt="logo"  />
            </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 overflow-hidden bg-white rounded-lg shadow-xl"
          >
            <div className="px-10 py-12">
              <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
              <div className="w-24 mx-auto mt-6 border-b-2" />
              <TextInput
                className="mt-10"
                label="Email"
                name="email"
                type="email"
                errors={errors.email}
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
              <TextInput
                className="mt-6"
                label="Password"
                name="password"
                type="password"
                errors={errors.password}
                value={data.password}
                onChange={e => setData('password', e.target.value)}
              />
              <label
                className="flex items-center mt-6 select-none"
                htmlFor="remember"
              >
                <input
                  name="remember"
                  id="remember"
                  className="mr-1"
                  type="checkbox"
                  checked={data.remember}
                  onChange={e => setData('remember', e.target.checked)}
                />
                <span className="text-sm">Remember Me</span>
              </label>
            </div>
            <div className="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
              <a className="hover:underline" tabIndex="-1" href="#reset-password">
                Forgot password?
              </a>
              <LoadingButton
                type="submit"
                loading={processing}
                className="btn-indigo"
              >
                Login
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Login
