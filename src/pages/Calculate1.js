import React from 'react';
import { BigNumber } from "bignumber.js";
import styled from 'styled-components';

class Calculate1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNum: '',
            numA: '',
            operate: '',
            numB: '',
            result: ''
        };
    }
    updateCurrent(e) {
        this.setState({
            currentNum: e.target.value
        })
    }

    setNumber1(c) {
        console.log(c);
        this.setState({
            currentNum: this.state.currentNum + '' + c
        })
    }

    handleItem(icon) {
        switch (icon) {
            case "=": {
                if (this.state.currentNum === '') {
                    break;
                }
                this.setState({
                    numB: this.state.currentNum,
                    currentNum: ''
                });
                this.getResult(this.state.numA, this.state.currentNum);
                break;
            }
            case "C": {
                this.setState({
                    numA: '',
                    numB: '',
                    operate: '',
                    result: '',
                    currentNum: ''
                });
                break;
            }
            case "D": {
                if (this.state.currentNum === '' && this.state.operate !== '' && this.state.numA !== '') {
                    this.setState({
                        operate: '',
                        currentNum: this.state.numA
                    });
                    break;
                }
                this.setState({
                    currentNum: this.state.currentNum.slice(0, -1)
                });
                if (this.state.result !== '') {
                    this.setState({
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
                if (this.state.currentNum === '') {
                    dot = '0.';
                    this.setState({
                        currentNum: dot,
                        result: ''
                    })
                } else if (new BigNumber(this.state.currentNum + '1').isInteger()) {
                    dot = this.state.currentNum + ".";
                    this.setState({
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
                if (this.state.numA !== '' && this.state.operate !== '' && this.state.result == '') {
                    break;
                }
                if (this.state.currentNum === '' && this.state.numA === '') {
                    this.setState({
                        numA: '0',
                        operate: icon,
                        numB: '',
                        currentNum: '',
                        result: ''
                    });
                    break;
                }
                this.setState({
                    numA: this.state.currentNum,
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
                if (this.state.currentNum == '0') {
                    this.setState({ currentNum: icon });
                    break;
                }
                if (this.state.result !== '') {
                    this.setState({
                        numA: '',
                        numB: '',
                        operate: '',
                        currentNum: icon,
                        result: ''
                    });
                    break;
                } else {
                    this.setState({ currentNum: this.state.currentNum + '' + icon });
                    break;
                }

            }
        }
    }

    getResult(a, b) {
        let ans = new BigNumber('0');
        switch (this.state.operate) {
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
                b = b == '' ? 0 : b;
                ans = new BigNumber(b);
                break;
            }
        }
        this.setState(
            {
                numB: new BigNumber(b).toFixed(),
                currentNum: ans.toFixed(),
                result: ans.toFixed()
            }
        )
    }

    setRaw(icon) {
        return (<button
            style={BtnStyle}
            onClick={() => this.handleItem(icon)}
            key={icon}>
            {icon}
        </button>)
    }

    render() {
        return (
            <Wapper>
                <Header >
                    <input
                        style={InputStyle}
                        type="search"
                        onChange={this.updateCurrent.bind(this)}
                        value={this.state.currentNum} />
                </Header>
                <Body >
                    {['C', 'D', '%', '/'].map((item) => {
                        return (this.setRaw(item))
                    })}
                    {['7', '8', '9', '*'].map((item) => {
                        return (this.setRaw(item))
                    })}
                    {['4', '5', '6', '-'].map((item) => {
                        return (this.setRaw(item))
                    })}
                    {['1', '2', '3', '+'].map((item) => {
                        return (this.setRaw(item))
                    })}
                    {['^', '0', '.', '='].map((item) => {
                        return (this.setRaw(item))
                    })}
                </Body >
                <Footer >
                    <h5 style={MsgStyle}>Current: </h5>
                    <h5 style={{
                        ...MsgStyle,
                        color: "green"
                    }}>{this.state.currentNum}</h5>
                    <h5 style={MsgStyle}>Formula: </h5>
                    <h5 style={{
                        ...MsgStyle,
                        color: "blue"
                    }}> {`${this.state.numA} ${this.state.operate} ${this.state.numB}`}</h5>
                    <h5 style={MsgStyle}>result: </h5>
                    <h5 style={{
                        ...MsgStyle,
                        color: "red"
                    }}> {`${this.state.result}`}</h5>
                </Footer >
            </Wapper>
        );
    };
}

const Wapper = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 100vh;
`
const Header = styled.div`
display: inline-flex;
width: 100vw;
height: 100px;
`
const Body = styled.div`
width: 100vw;
flex-grow: 1;
display:flex;
flex-wrap: wrap;
justify-content:center;
`
const Footer = styled.div`
width: 100vw;
height: 200px;
`
const InputStyle = ({
    width: "96vw",
    height: "85px",
    fontSize: "x-large",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    margin: "auto"
})
const BtnStyle = ({
    width: "24vw",
    fontSize: "x-large"
})
const MsgStyle = ({
    margin: "auto",
    width: "96vw",
    wordWrap: "break-word",
})
export default Calculate1;