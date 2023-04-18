import styled from 'styled-components';

import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useAppContext } from 'src/context/appContext';

export default function Preferences() {
  const { setThemeColor } = useAppContext()

  return (
    <Styled>
      <div style={{ maxWidth: 200 }}>
        <BackToLink to="/dashboard/settings" text="Back to Settings" />
      </div>
      <div className={'title-container'}>
        <h1>Preferences</h1>
      </div>

      <button onClick={() => setThemeColor('primary')}>Change Primary</button>
      <button onClick={() => setThemeColor('purple')}>Change Purple</button>
      <button onClick={() => setThemeColor('teal')}>Change Teal</button>
      <button onClick={() => setThemeColor('blue')}>Change Blue</button>
      <button onClick={() => setThemeColor('orange')}>Change Orange</button>
      <button onClick={() => setThemeColor('gold')}>Change Gold</button>
      <button onClick={() => setThemeColor('gray')}>Change Gray</button>
    </Styled>
  );
}

const Styled = styled.div`
  .title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
  }

  .title-container h1 {
    color: ${(props) => props.theme.colors.textPrimary};
  }

  button {
    margin-right: 1rem;
  }
`