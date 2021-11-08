import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Wapper = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 100vh;
`
export const Header = styled.div`
display: inline-flex;
width: 100vw;
height: 100px;
`
export const Body = styled.div`
width: 100vw;
flex-grow: 1;
display:flex;
flex-wrap: wrap;
justify-content:center;
`
export const Footer = styled.div`
width: 100vw;
height: 200px;
`
export const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #383838 10%, #4D4D4D 90%)',
        border: 0,
        borderRadius: 8,
        boxShadow: '0 3px 5px 2px rgba(240, 184, 11, 0.3)',
        color: 'white',
        padding: '0 30px',
        width: "24vw",
        color: 'yellow',
        fontSize: "x-large"
    },
});

export const InputStyle = ({
    width: '96vw',
    height: '85px',
    fontSize: 'x-large',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordSpacing: 'break-word',
    margin: 'auto',
    fontWeight: 'bold',
    color: 'black',
    borderRadius: '15px',
    outline: 'none',
    border: '1px #f0b80b solid',
});
export const MsgStyle = ({
    marginLeft: '2vw',
    wordWrap: 'break-word',
})