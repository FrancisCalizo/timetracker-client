import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import * as React from 'react'

import classes from './login.module.css';

type FormValues = {
  email: string;
  password: string;
};


export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [isLoginError, setIsLoginError] = React.useState(null)

  const onSubmit = async (data: FormValues) => {
    console.log('data', data);

    const { email, password } = data;

    try {
      const res = await axios.post(`/login`, {      
        email,
        password,
      });

      console.log(res);

      setIsLoginError(null)
    } catch (err: any) {
      setIsLoginError(err.response.data)
    }

    // navigate('/dashboard');
  };

  const testFunction = async () => {
    try {
      const res = await axios.get(`/getAllClients`);

      console.log(res);

    } catch (err: any) {
      setIsLoginError(err.response.data)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    
      <div className={classes['page-container']}>
        <div className={classes['form-container']}>
          <h2 className={classes['title']}>Welcome!</h2>
          <p className={classes['sign-in-text']}>
            Please sign in to your account
          </p>

          <Link to="/register" className={classes['signup']}>
            Don't have an account? Sign up
          </Link>
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
            <Link to="/forgot-password" className={classes['forgot-password']}>
              Forgot your password?
            </Link>

            <button className={classes['login-button']}>Login</button>

            

            {isLoginError && isLoginError}
          </div>
        </div>
      </div>
    </form>

    <button className={classes['login-button']} onClick={testFunction}>Test</button>
  </>
  );
}
