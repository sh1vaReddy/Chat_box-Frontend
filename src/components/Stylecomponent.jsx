import {keyframes, Skeleton, styled} from '@mui/material';
import {Link as LinkComponent} from 'react-router-dom'

const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });


 const Link=styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding: 1rem;
    &:hover{
        background-color: #f0f0f0;
    }
`

const InputBox=styled("input")`
width: 100%;
height: 100%;
border:none;
outline: none;
padding: 0 3rem;
border-radius: 1.5rem;
background-color:"rgba(247,247,247,1)";

`
const bonuceAnimation = keyframes`
    0% {transform:scale(1);}
    50% {transform:scale(1.5);}
    100% {transform:scale(1);}
`

const  TypingSkeleton=styled(Skeleton)(()=>({
    animation:`${bonuceAnimation} 1s infinte`
}))

export {Link,VisuallyHiddenInput,InputBox,TypingSkeleton}