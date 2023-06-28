import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { useAppContext } from 'src/context/appContext';

interface StyledProps {
  themeColor: string;
}

export default function Home() {
  const { themeColor } = useAppContext()

  return (
    <MainContainer themeColor={themeColor}>
      <div>
        <Link to='/login'>
          <button className='button'>
            Login
          </button>
        </Link>
        <Link to='/register'>
          <button className='button'>
            Register
          </button>
        </Link>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div<StyledProps>`
  height: 100vh;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;

    & a {
      text-align: center;
      margin: 0 auto;

      & button {
        width: 200px;
        padding: .5rem 1rem;
        margin: 1rem;

        display: block;
        background: ${(props) => props.theme.colors[props.themeColor]};
        color: white;
        border: 0.5px solid white;
        padding: ${(props) => props.theme.input.padding};
        border-radius: 6px;
        font-size: ${(props) => props.theme.input.fontSize};    
        box-shadow: ${(props) => props.theme.button.boxShadow};
        transition: background 300ms ease-in-out, transform 150ms ease-in-out,
          filter 150ms ease-in-out;

        &:enabled {
          cursor: pointer;
        }

        &:disabled {
          background: gainsboro;
          opacity: 9;
        } 
      }
    }
  }

  .login-button:hover:enabled {
    filter: brightness(85%);
  }
`
