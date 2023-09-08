import styled from 'styled-components';
import { BaseButton, GoogleButton, InvertedButton } from '../button/button.style';

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},${GoogleButton},${InvertedButton} {
    margin-top: auto;
  }

`;

export const EmptyMessage = styled.div`
  font-size: 18px;
  margin: 50px auto;
`; 

export const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow:auto;
`;
