import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default function Home() {
  return (
    <MainContainer>
      <div>
        <Link to='/login'>
          <button className='login'>
            Login
          </button>
        </Link>
        <Link to='/register'>
          <button className='register'>
            Register
          </button>
        </Link>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100vh;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;

    & a {
      text-align: center;

      & button {
        width: 200px;
        padding: .5rem 1rem;
        margin: 1rem;

        & .login {
          
        }

        & .register {

        }
      }
    }
  }
`
