import React, { useState , useRef, useEffect} from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import styled from 'styled-components'

interface ModalProps {
	isOpen: boolean;
	setIsOpen: any;
  children: any;
}

export default function Modal({
	isOpen,
	setIsOpen,
	children
}: ModalProps){

	useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

	// Prevent background scroll when modal is showing
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
  }, [isOpen]);

	const ref = useRef(null)

	const handleClickOutside = () => {
		setIsOpen(false)
  }

  const handleClickInside = () => {
    // Your custom logic here
    console.log('clicked inside')
  }

	useOnClickOutside(ref, handleClickOutside)

  return (
		<>
			{isOpen && (
				<Styled>
					<section ref={ref}>
						{children}
					</section>
				</Styled>
			)}
		</>
		
  )
}

const Styled = styled.div`
	position: absolute;
	width: 100vw; height: 100ch;
	z-index: 999;
	background: rgba(0,0,0,0.7);
	left: 0; top: 0;
	
	
	section {
		background: white;
		border: 1px solid gainsboro;
		position: absolute;
		left: 50%; top: 50%;
		transform: translate(-50%, -50%);
	}
	
`