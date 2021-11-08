import React from 'react';

class ClickCounter extends React.Component {
  constructor(props) {
    super(props);
    this.onClickBtnAdd = this.onClickBtnAdd.bind(this);
    this.onClickBtnSub = this.onClickBtnSub.bind(this);
    this.state = { count: 0 };
  }

  onClickBtnAdd() {
    this.setState({ count: this.state.count + 1 });
  }

  onClickBtnSub() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div >
        <button onClick={this.onClickBtnAdd}>Click add</button>
        <button onClick={this.onClickBtnSub}>Click sub</button>
        <div>
          Click Count: <span id='clickCount'>{this.state.count}</span>
        </div>
      </div>
    );
  };
}


export default ClickCounter;