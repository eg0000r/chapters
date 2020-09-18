import React from 'react';
import roll from "./roll";
import './App.css';

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hint: false,
      checked: false,
      y: false,
      l: false,
      year: '',
      location: ''
    }
  }
  buttonDisplay = () => {
    if (this.state.y && this.state.l) {
      return {display: 'none'};
    }
    return {display: 'box'};
  };
  hintDisplay = () => {
    if (this.state.hint) {
      return {opacity: 1};
    } else if (this.state.y && this.state.l) {
      return {display: 'none'};
    }
    return {opacity: 0};
  };
  isYear = () => {
    if (this.state.checked) {
      if (this.state.y) {
        return (
            <span className={'correct'}>✓</span>
        );
      } else {
        return (
            <span className={'wrong'}>✕</span>
        );
      }
    }
    return (
        <span/>
    );
  };
  isLocation = () => {
    if (this.state.checked) {
      if (this.state.l) {
        return (
            <span className={'correct'}>✓</span>
        );
      } else {
        return (
            <span className={'wrong'}>✕</span>
        );
      }
    }
    return (
        <span/>
    );
  };
  setYear = (e) => {
    this.setState({year: e.target.value.toString()});
  };
  setLocation = (e) => {
    this.setState({location: e.target.value.toString()});
  };
  checkLine = () => {
    this.setState({
      checked: true,
      y: (this.props.chapter.y === this.state.year),
      l: (this.props.chapter.l.toLowerCase() === this.state.location.toLowerCase())
    });
    if ((this.props.chapter.l.toLowerCase() === this.state.location.toLowerCase()) && (this.props.chapter.y === this.state.year)) {
      this.setState({hint: false});
      this.props.hook();
    }
  };
  toggleHint = () => {
    this.setState({hint: !this.state.hint});
  };
  render() {
    return (
        <div>
          <div className={'line'}>
            <b>{this.props.chapter.d}</b>
            <label>Year: <input disabled={this.state.y} onChange={this.setYear}/> {this.isYear()}</label>
            <label>Location: <input disabled={this.state.l} onChange={this.setLocation}/> {this.isLocation()}</label>
            <div style={this.buttonDisplay()} onClick={this.checkLine} className={'check'}>+</div>
            <div style={this.buttonDisplay()} onClick={this.toggleHint} className={'check'}>?</div>
          </div>
          <div style={this.hintDisplay()} className={'hint'}><i>{this.props.chapter.y}</i> {this.props.chapter.l}</div>
        </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      elements: [<Line key={0} hook={this.newElement} chapter={roll[0]}/>]
    };
  }
  newElement = () => {
    if (this.state.elements.length < roll.length) {
      this.setState({elements: this.state.elements.concat([<Line key={parseInt(this.state.start) + parseInt(this.state.elements.length)} hook={this.newElement} chapter={roll[parseInt(this.state.start) + parseInt(this.state.elements.length)]}/>])});
    }
  };
  startAt = () => {
    let index = [];
    roll.forEach(line => {
      index.push(line.d);
    });
    let arr = [];
    for (let i = 0; i < index.length; i ++) {
      arr.push(<option key={i} value={i}>{index[i]}</option>);
    }
    return (
        <div>
          <label>Start at: <select onChange={(e) => {this.setState({start: e.target.value, elements: [<Line key={e.target.value} hook={this.newElement} chapter={roll[e.target.value]}/>]})}}>{arr}</select></label>
        </div>
    )
  };
  render() {
    return (
        <div>
          {this.startAt()}
          {this.state.elements}
        </div>
    );
  }
}

function App() {
  return (
    <div className={'root'}>
      <h1>Chapter Roll</h1>
      <Content/>
    </div>
  );
}

export default App;
