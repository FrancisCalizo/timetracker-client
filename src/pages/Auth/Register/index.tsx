import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import classes from './Register.module.css';

type FormValues = {
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log('data', data);

    const { email, password } = data;

    try {
      const res = await axios.post('http://localhost:5000/register', {
        email,
        password,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes['page-container']}>
        <div className={classes['form-container']}>
          <h2 className={classes['title']}>Welcome!</h2>
          <p className={classes['sign-in-text']}>
            Please register with a email and password
          </p>
          <div className={classes['grid-container']}>
            <div className={classes['input-container']}>
              <input
                className={classes['input']}
                type="text"
                placeholder="Email"
                {...register('email', {
                  required: 'This field is required',
                })}
              />
              {errors.email && (
                <div className={classes['error-message']}>
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className={classes['input-container']}>
              <input
                className={classes['input']}
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'This field is required',
                })}
              />
              {errors.password && (
                <div className={classes['error-message']}>
                  {errors.password.message}
                </div>
              )}
            </div>
            <Link to="/" className={classes['forgot-password']}>
              Have an account? Sign in
            </Link>

            <button className={classes['register-button']}>Register</button>
          </div>
        </div>
      </div>
    </form>
  );
}
