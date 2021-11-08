import { BigNumber } from "bignumber.js";
import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Wapper, Header, Body, Footer, useStyles, InputStyle, MsgStyle } from '../components';

const Calculate = () => {
    const [state, setState] = useState({
        currentNum: '',
        numA: '',
        operate: '',
        numB: '',
        result: '',
        value: 'mango',
    })

    useEffect(() => {
        document.getElementById('ser').addEventListener('keyup', (e) => {
            console.log(e.key);
        })
    }, [])                                                                   //监听[Parma]变化时才调用

    function handleItem(icon) {
        switch (icon) {
            case "Enter":
            case "=": {
                if (state.currentNum === '') {
                    break;
                }
                setState({
                    ...state,
                    numB: state.currentNum,
                    currentNum: ''
                });
                getResult(state.numA, state.currentNum);
                break;
            }
            case "C": {
                setState({
                    ...state,
                    numA: '',
                    numB: '',
                    operate: '',
                    result: '',
                    currentNum: ''
                });
                break;
            }
            case "D": {
                if (state.currentNum === '' && state.operate !== '' && state.numA !== '') {
                    setState({
                        ...state,
                        operate: '',
                        currentNum: state.numA
                    });
                    break;
                }
                setState({
                    ...state,
                    currentNum: state.currentNum.slice(0, -1)
                });
                if (state.result !== '') {
                    setState({
                        ...state,
                        numA: '',
                        numB: '',
                        operate: '',
                        result: ''
                    });
                }
                break;
            }
            case ".": {
                let dot = '';
                if (state.currentNum === '') {
                    dot = '0.';
                    setState({
                        ...state,
                        currentNum: dot,
                        result: ''
                    })
                } else if (new BigNumber(state.currentNum + '1').isInteger()) {
                    dot = state.currentNum + ".";
                    setState({
                        ...state,
                        currentNum: dot,
                        result: ''
                    })
                }
                break;
            }
            case "%":
            case "/":
            case "+":
            case "-":
            case "^":
            case "*": {
                if (state.numA !== '' && state.operate !== '' && state.result === '') {
                    break;
                }
                if (state.currentNum === '' && state.numA === '') {
                    setState({
                        ...state,
                        numA: '0',
                        operate: icon,
                        numB: '',
                        currentNum: '',
                        result: ''
                    });
                    break;
                }
                setState({
                    ...state,
                    numA: state.currentNum,
                    operate: icon,
                    numB: '',
                    currentNum: '',
                    result: ''
                });
                break;
            }
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0": {
                if (state.currentNum === '0') {
                    setState({
                        ...state,
                        currentNum: icon
                    });
                    break;
                }
                if (state.result !== '') {
                    setState({
                        ...state,
                        numA: '',
                        numB: '',
                        operate: '',
                        currentNum: icon,
                        result: ''
                    });
                    break;
                } else {
                    setState({
                        ...state,
                        currentNum: state.currentNum + '' + icon
                    });
                    break;
                }
            }
            default: {
                setState({
                    ...state,
                    currentNum: state.currentNum
                });
                break;
            }
        }
    }

    function getResult(a, b) {
        let ans = new BigNumber('0');
        switch (state.operate) {
            case '+': {
                ans = new BigNumber(a).plus(new BigNumber(b));
                break;
            }
            case '-': {
                ans = new BigNumber(a).minus(new BigNumber(b));
                break;
            }
            case '*': {
                ans = new BigNumber(a).times(new BigNumber(b));
                break;
            }
            case '/': {
                if (new BigNumber(b).isZero()) {
                    ans = new BigNumber(0);
                    break;
                }
                ans = new BigNumber(a).div(new BigNumber(b));
                break;
            }
            case '^': {
                ans = new BigNumber(a).pow(new BigNumber(b));
                break;
            }
            case '%': {
                ans = new BigNumber(a).mod(new BigNumber(b));
                break;
            }
            default: {
                b = b === '' ? 0 : b;
                ans = new BigNumber(b);
                break;
            }
        }
        setState(
            {
                ...state,
                numB: new BigNumber(b).toFixed(),
                currentNum: ans.toFixed(),
                result: ans.toFixed()
            }
        )
    }
    const classes = useStyles();                 //需要先进行实例
    function setRaw(icon) {
        return (<Button
            className={classes.root}
            onClick={() => handleItem(icon)}
            key={icon}>
            {icon}
        </Button>)
    }

    function updateCurrent(e) {
        // let c = e.target.value.slice(-1);
        setState({
            ...state,
            currentNum: e.target.value.slice(0, -1)
        })
    }

    return (
        <Wapper>
            <Header >
                <input
                    style={InputStyle}
                    id='ser'
                    // type="search"
                    placeholder="请输入数值"
                    onChange={updateCurrent}
                    value={state.currentNum} />
            </Header>
            <Body >
                {['C', 'D', '%', '/'].map((item) => {
                    return (setRaw(item))
                })}
                {['7', '8', '9', '*'].map((item) => {
                    return (setRaw(item))
                })}
                {['4', '5', '6', '-'].map((item) => {
                    return (setRaw(item))
                })}
                {['1', '2', '3', '+'].map((item) => {
                    return (setRaw(item))
                })}
                {['^', '0', '.', '='].map((item) => {
                    return (setRaw(item))
                })}
            </Body >
            <Footer >
                <span style={MsgStyle}>Current: </span>
                <h5 style={MsgStyle} >{state.currentNum}</h5>
                <span style={MsgStyle}>Formula: </span>
                <h5 style={MsgStyle} > {`${state.numA} ${state.operate} ${state.numB}`}</h5>
                <span style={MsgStyle}>result: </span>
                <h5 style={MsgStyle}> {`${state.result}`}</h5>
            </Footer >
        </Wapper>
    );
}

export default Calculate