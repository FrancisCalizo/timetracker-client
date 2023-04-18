import * as React from 'react'
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'

import { useAppContext } from 'src/context/appContext';

type FormValues = {
  email: string;
  password: string;
};

interface StyledProps {
  themeColor: string;
}


export default function Login() {
  const navigate = useNavigate();
  const { themeColor } = useAppContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [isLoginError, setIsLoginError] = React.useState<string | null>(null)

  const onSubmit = async (data: FormValues) => {    
    const { email, password } = data;

    navigate('/dashboard');

    if (process.env.NODE_ENV === 'development') {
      try {
      const res = await axios.post(`/login`, {      
        email,
        password,
      });

      // Redirect them to their dashboard
      if (res.status === 200) {
      }

      setIsLoginError(null)
    } catch (err: any) {
      if (err.response.status === 403){
        setIsLoginError(err.response.data)
      } else {
        setIsLoginError('Something went wrong. Please try again.')
      }
    }
    }
  };

  return (
  <Styled themeColor={themeColor}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'page-container'}>
        <div className={'form-container'}>
          <h2 className={'title'}>Welcome!</h2>
          <p className={'sign-in-text'}>
            Please sign in to your account
          </p>

          <Link to="/register" className={'signup'}>
            Don't have an account? Sign up
          </Link>
          <div className={'grid-container'}>
            <div className={'input-container'}>
              <input
                className={'input'}
                type="text"
                placeholder="Email"
                {...register('email', {
                  required: 'This field is required',
                })}
              />
              {errors.email && (
                <div className={'error-message'}>
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className={'input-container'}>
              <input
                className={'input'}
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'This field is required',
                })}
              />
              {errors.password && (
                <div className={'error-message'}>
                  {errors.password.message}
                </div>
              )}
            </div>
            <Link to="/forgot-password" className={'forgot-password'}>
              Forgot your password?
            </Link>

            <button className={'login-button'}>Login</button>

            <p className={'login-error'}>
              {isLoginError && isLoginError}
            </p>
          </div>
        </div>
      </div>
    </form>
  </Styled>
  );
}

const Styled = styled.div<StyledProps>`
  .page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    background: #f1f2f6;
  }

  .form-container {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 3rem 2rem 4rem;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 1rem;
  }

  .title {
    text-align: center;
    color: ${(props) => props.theme.colors.textPrimary};
    margin-bottom: 0;
  }

  .sign-in-text {
    color: ${(props) => props.theme.colors.textPrimary};
    margin-top: 0.5rem;
    text-align: center;
    font-weight: 300;
  }

  .input-container {
    grid-column: 1/-1;
  }

  .input {
    box-sizing:border-box;
    display: block;
    width: 100%;
    font-size: calc(14px + (16 - 14) * ((100vw - 400px) / (1800 - 400)));
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid lightgray;
    border-radius: 4px;
  }

  .error-message {
    color: ${(props) => props.theme.colors.danger};
    font-size: 12px !important;
    width: 100%;
    margin: 0 2px 0;
  }

  .forgot-password {
    text-align: center;
    font-size: 0.85rem;
    margin: 0.25rem;
    color: ${(props) => props.theme.colors[props.themeColor]};
    text-decoration: none;
  }

  .signup {
    display: block;
    text-align: center;
    font-size: 0.8rem;
    margin: 0.25rem;
    color: ${(props) => props.theme.colors[props.themeColor]};
    margin: 0 auto 1rem;
    text-decoration: none;
  }

  .login-button {
    display: block;
    width: 100%;
    background: ${(props) => props.theme.colors[props.themeColor]};
    color: white;
    border: 0.5px solid white;
    padding: ${(props) => props.theme.input.padding};
    border-radius: 6px;
    font-size: ${(props) => props.theme.input.fontSize};
    cursor: pointer;
    box-shadow: ${(props) => props.theme.button.boxShadow};
    transition: background 300ms ease-in-out, transform 150ms ease-in-out,
      filter 150ms ease-in-out;
  }

  .login-button:hover {
    filter: brightness(85%);
  }

  .login-error{
    width: 100%;
    text-align: center;
    margin: .25rem 0;
    color: ${(props) => props.theme.colors.danger};
  }
`