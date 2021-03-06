// css will allows us to incapsulate some CSS inside of a block that we can use as a variable
// and inject into our different components.

import styled, { css } from 'styled-components';
// styled component can use regular JavaScript variables instead of sass variables
const subColor = 'grey';
const mainColor = 'black';

// Order of styling is important 
// If we need to target these later then inside of the styling, we need to make sure that we declare it beforehand.
const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && shrinkLabelStyles};
`;


export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;