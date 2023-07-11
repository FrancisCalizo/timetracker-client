import React from 'react'
import styled from 'styled-components'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

import { useAppContext } from 'src/context/appContext';

interface StyledProps {
  themeColor: string;
}

interface SubmitConfirmationProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const publicKey = process.env.REACT_APP_EMAILJS_KEY;
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID as string;

export default function SubmitConfirmation({
  setIsOpen
}: SubmitConfirmationProps) {
  const { themeColor } = useAppContext()

  const handleSubmit = () => {
    // const env = process.env.NODE_ENV;

    // TODO: Temporary params
    const templateParams = {
      candidate_name: 'John Smith',
      to_name: 'Bill Burr',
      timesheet_link: 'https://www.google.com/'
    };

    // Send Email to Client for Approval if not approved
    const NOT_APPROVED = true;
    if (NOT_APPROVED) {
      
      emailjs.send(serviceId, 'aagrav_timetracker', templateParams, publicKey)
      .then(() => {
        toast.success('Timesheet submitted for approval', {
          duration: 4000,
          position: 'bottom-right',
        });
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsOpen(false)
      })
    }
  }

  return (
    <Styled themeColor={themeColor}>
      <header>
          Submit for For Approval
      </header>

      <main>
        Are you sure you want to submit this timesheet? 
        You will not be able to make any changes once it has been submitted.
      </main>

      <footer>
        <button onClick={() => setIsOpen(false)}>
          Cancel
        </button>

        <button onClick={handleSubmit}>
          Submit
        </button>
      </footer>
    </Styled>
  )
}

const Styled = styled.section<StyledProps>`
  padding: 16px 32px;
  min-width: 500px;

  header {
    font-size: 24px;
  }

  main {
    margin: 24px 0;
  }

  footer {
    display: flex;
    justify-content: flex-end;

    button {
      display: block;
      font-size: ${(props) => props.theme.input.fontSize};
      box-shadow: ${(props) => props.theme.button.boxShadow};
      border-radius: 6px;
      cursor: pointer;
      transition: background 300ms ease-in-out, transform 150ms ease-in-out,
        filter 150ms ease-in-out;
      
      color: white;
      border: 0.5px solid white;
      padding: 0.5rem 1.5rem;
      margin-left: 0.5rem;

      &:nth-child(1) {
        margin-right: 8px;
        color: #000;
      }

      &:nth-child(2) {
        background: ${(props) => props.theme.colors[props.themeColor]};
      }
    }

    
  }
`
