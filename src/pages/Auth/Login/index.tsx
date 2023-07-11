import { SignIn } from "@clerk/clerk-react";

import styled from 'styled-components'

export default function SignInPage() {
  return (
    <Styled>
      <SignIn />
    </Styled>
  );
}

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
