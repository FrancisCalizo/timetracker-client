import React from 'react'

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

interface ClerkProectedHOCProps {
  children: JSX.Element
}

export default function ClerkProtectedHOC({ children }: ClerkProectedHOCProps) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </> 
  )
}
