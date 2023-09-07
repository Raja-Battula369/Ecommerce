import { useForm } from 'react-hook-form';
import { resetTokenSender } from '../../../lib/Fetch.actions';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const { errors, isSubmitSuccessful } = formState;
  const navigate = useNavigate();
  const handleFogotPassword = async (Formvalues) => {
    try {
      const res = await resetTokenSender('/auth/send-reset-token', Formvalues);
      res
        ? toast.success('reset token sent successfully')
        : toast.error('user not found');
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full font-semibold  text-black min-h-screen max-h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleFogotPassword)}
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

        <div className="flex flex-col justify-center items-center gap-2">
          <button className="button flex-1 px-8">reset</button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
