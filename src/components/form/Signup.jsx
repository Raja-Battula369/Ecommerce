import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../../lib/Fetch.actions';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [loading, SetLoading] = useState(false);

  const navigate = useNavigate();
  const { register, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordmatch: '',
    },
  });
  const { errors, isSubmitSuccessful } = formState;
  const handleregister = async (Formvalues) => {
    SetLoading(true);

    try {
      const res = await RegisterUser('/auth/register', Formvalues);
      SetLoading(false);
      res ? toast.success('success') : toast.error('error');
      res && navigate('/signin');
    } catch (error) {
      SetLoading(false);

      console.log(error);
    }
  };
  return (
    <div className="w-full font-semibold  text-black min-h-screen max-h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleregister)}
        className="w-[500px] h-fit  border-[3px] border-violet-600 shadow-sm hover:shadow-md transition bg-slate-600 rounded-md "
      >
        <div className="flex flex-col  gap-2 p-4">
          <label className="text-white" htmlFor="Name">
            Name
          </label>
          <input
            id="Name"
            className="input p-2"
            placeholder="name"
            type="Name"
            maxLength={25}
            minLength={4}
            {...register('name', {
              required: {
                value: true,
                message: 'please enter your name',
              },
            })}
          />
          <p className="text-red-600 drop-shadow-md hover:text-red-700 font-bold">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <label className="text-white" htmlFor="Email">
            Email
          </label>
          <input
            id="Email"
            className="input p-2"
            placeholder="email"
            type="text"
            {...register('email', {
              required: {
                value: true,
                message: 'please enter your email',
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'please enter valid email address',
              },
              validate: {
                emailCheck: (value) => {
                  return (
                    value.endsWith('@gmail.com') ||
                    'invalid email please enter gmail only'
                  );
                },
              },
            })}
          />
          <p className="text-red-600 drop-shadow-md hover:text-red-700 font-bold">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex flex-col  gap-2 p-4">
          <label className="text-white" htmlFor="Password">
            Password
          </label>
          <input
            id="Password"
            className="input p-2"
            placeholder="password"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'please enter your password',
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).+$/,
                message:
                  ' please enter atleast one alpha and one symbol and one number',
              },
              validate: {
                minLen: (value) => {
                  return value.length > 5 || 'minimum 6 characters required';
                },
              },
            })}
          />
          <p className="text-red-600 drop-shadow-md hover:text-red-700 font-bold">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex flex-col  gap-2 p-4">
          <label className="text-white" htmlFor="Password">
            Password Confirm
          </label>
          <input
            id="PasswordConfirm"
            className="input p-2"
            placeholder="passwordConfirm"
            type="password"
            {...register('passwordmatch', {
              required: {
                value: true,
                message: 'please enter your password',
              },
              validate: {
                passwordMatch: (value) => {
                  return (
                    watch('password') === value || 'password is not matched'
                  );
                },
              },
            })}
          />
          <p className="text-red-600 drop-shadow-md hover:text-red-700 font-bold">
            {errors.passwordmatch?.message}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <button className="button flex-1 px-8">
            {loading ? 'loading' : 'Signup'}
          </button>
          <span className="font-semibold ">
            already you have a account?{' '}
            <span
              onClick={() => navigate('/signin')}
              className="underline  text-white hover:text-violet-400"
            >
              Signin here
            </span>
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Signup;
