import React from 'react';
import styled, { css} from 'styled-components';
import { Span } from 'react-super-styled'
 const bottomDraw = (props) =>(
    <BottomDraw isHovered={props.isHovered}>
        <Span margin="0 5">Country: {props.country}</Span>
        <Span margin="0 5">Likes: {props.likes}</Span>
    </BottomDraw>
);
export const BottomDraw = styled.div`
    height: 30%;
    line-height:normal;
    display: none;
    vertical-align:bottom;
    background-color: rgba(0,0,0,0.5);
    box-sizing: border-box;
    color: white;
    text-decoration: none !important;
    padding: 5px;
    z-index: 100;
    box-sizing: border-box;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out;
    ${ props => props.isHovered && css`
    transform: translateY(0);
    display: block;
  `};
`
export default bottomDraw;
