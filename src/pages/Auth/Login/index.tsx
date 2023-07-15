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
  background: #f1f2f6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
