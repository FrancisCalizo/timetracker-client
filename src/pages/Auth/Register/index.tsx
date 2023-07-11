import React from 'react'
import styled from 'styled-components';

import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <Styled>
      <SignUp />
    </Styled>
  );
}

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
