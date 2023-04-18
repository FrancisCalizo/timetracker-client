import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faGear, faLock } from '@fortawesome/free-solid-svg-icons';

export default function Settings() {
 const LINKS = [
   { 
     label: 'General',
     icon: faGear,
     url: null,
     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, rerum!'
   },
   { 
     label: 'Preferences',
     icon: faImage,
     url: 'preferences',
     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, rerum!'
   },
   { 
     label: 'Security',
     icon: faLock,
     url: null,
     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, rerum!'
   },
 ]

  return (
    <Styled>
      <div className={'title-container'}>
        <h1>Settings</h1>
      </div>

      <div className='list-section'>
        <ul>
          {LINKS.map(link => {
            const icon = link.icon;

            return (
               <Link to={link.url ? `/dashboard/settings/${link.url}` : '#'}>
                  <li>
                    <FontAwesomeIcon
                      icon={icon}
                      style={{ fontSize: 16, marginRight: '1rem' }}
                    />
                    <h3>{link.label}</h3>
                    <p>{link.description}</p>
                  </li>
               </Link>              
            )
          })}
        </ul>
      </div>
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

  .list-section {
    & a { color: inherit; }
    
    & ul { 
      padding: 0;

      & li {
        list-style-type: none;
        padding: 1rem;
        border-width: 1px 1px 0 1px;
        border-style: solid;
        border-color: gainsboro;

        &:last-child {
          border-bottom: 1px solid gainsboro;
        }

        & h3 {
          display: inline-block;          
          margin: 0 1rem 0 0;
          font-weight: normal;
          font-size: 1.1rem;
        }

        & p {
          display: inline-block;          
          font-weight: lighter;
          font-size: .9rem;
          margin: 0 1rem 0 0;
        }
      }
    }
 }
`