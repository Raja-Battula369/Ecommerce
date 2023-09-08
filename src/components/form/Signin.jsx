import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../lib/Fetch.actions';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginStore } from '../../../lib/store/features';
const Signin = () => {
  const navigate = useNavigate();
  const [loading, SetLoading] = useState(false);
  const dispatch = useDispatch();

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { errors, isSubmitSuccessful } = formState;
  const handleLogin = async (Formvalues) => {
    SetLoading(true);

    try {
      SetLoading(false);

      const res = await login('/auth/login', Formvalues);

      res
        ? toast.success('success')
        : toast.error('email or password not valid');

      dispatch(
        loginStore({
          token: res.token,

          email: res.data.email,
          name: res.data.name,
        })
      );
      navigate('/');
    } catch (error) {
      SetLoading(false);

      console.log(error);
    }
  };
  const handleGuest = async () => {
    SetLoading(true);

    try {
      SetLoading(false);

      const res = await login('/auth/login', {
        email: 'oddeyking@gmail.com',
        password: 'qw12qw!',
      });

      res
        ? toast.success('success')
        : toast.error('email or password not valid');

      dispatch(
        loginStore({
          token: res.token,

          email: res.data.email,
          name: res.data.name,
        })
      );
      navigate('/');
    } catch (error) {
      SetLoading(false);

      console.log(error);
    }
  };
  return (
    <div className="dark:bg-black dark:text-white w-full font-semibold  text-black min-h-screen max-h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-[90%] md:w-[500px] h-fit  border-[3px] border-violet-600 shadow-sm hover:shadow-md transition bg-slate-600 rounded-md "
      >
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
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <button type="submit" className="button flex-1 px-8">
              {loading ? 'loading' : 'Login'}
            </button>
            <button
              onClick={handleGuest}
              className="button flex-1 px-8 bg-slate-600"
            >
              {loading ? 'loading' : 'Guest'}
            </button>
          </div>
          <span className="font-semibold ">
            Create new account{' '}
            <span
              onClick={() => navigate('/signup')}
              className="underline  text-white hover:text-violet-400 cursor-pointer"
            >
              Signup here
            </span>
          </span>
          <span
            onClick={() => navigate('/forgotpassword')}
            className="text-xl underline cursor-pointer"
          >
            forgot password
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Signin;
