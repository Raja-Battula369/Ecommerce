import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { changePassword } from '../../../lib/Fetch.actions';
import toast, { Toaster } from 'react-hot-toast';
const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, SetLoading] = useState(false);
  const { id, token } = useParams();
  // console.log(useParams());
  const { register, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      password: '',
      passwordmatch: '',
    },
  });
  const { errors, isSubmitSuccessful } = formState;
  const handleLogin = async (Formvalues) => {
    console.log(Formvalues);
    SetLoading(true);

    try {
      SetLoading(false);
      const res = await changePassword(
        `/auth/reset/${id}/${token}`,
        Formvalues
      );
      res
        ? toast.success('passwords updated')
        : toast.error('token is expired');
      navigate('/signin');
    } catch (error) {
      SetLoading(false);

      console.log(error);
    }
  };
  return (
    <div className="w-full font-semibold  text-black min-h-screen max-h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-[500px] h-fit  border-[3px] border-violet-600 shadow-sm hover:shadow-md transition bg-slate-600 rounded-md "
      >
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
            {loading ? 'loading' : 'update'}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ChangePassword;
