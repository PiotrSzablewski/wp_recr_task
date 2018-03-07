import styled from 'styled-components';
export const Button = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 2px;
    color: ${props => props.primary? '#5C9210':'#944317'};
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
    box-sizing: border-box;
    &:hover{
        border-bottom-color: ${props => props.primary? '#5C9210':'#944317'};
        border-bottom-width: 2px;
        border-bottom-style: solid;
    }
`
