import { css } from 'styled-components';

export const theme = {
  global: {
    setFocus: (color: string) => {
      return css`
        &:focus {
          outline: none;
          box-shadow: 0 0 8px 3px ${color};
        }
      `;
    },
    setInputFocus: (color: string) => {
      return css`
        &:focus {
          outline: none;
          border-color: ${color};
        }
      `;
    },
    setFocusAndFocusWithin: (color: string) => {
      return css`
        &:focus-within {
          outline: none;
          border-color: ${color};
        }
      `;
    },
  },
  colors: {
    primary: '#ff6b6b',
    textPrimary: '#2d3436',
    danger: '#d63031',
    edit: '#0097e6',
    success: '#27ae60',
  
    purple: '#AEB5D8',
    paleBlue: '#CCD7EA',
    pink: '#EDBECD',
    teal: '#93DFF3',
    yellow: '#F6E9B5',
    darkGray: '#202020',
    blue: '#0984e3',

    gray: '#7A7A7A',
    light: '#EDEDED',
    dark: '#241F21',
    green: '#3D4907',
    gold: '#CCB86B',
    brown: '#5B3F0C',
    orange: '#FF7221',
  },
  button: {
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.4)`,
  },
  input: {
    fontSize: '1rem',
    padding: '1rem',
  },
};
