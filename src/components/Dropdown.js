import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDown: false,
    }
    this.dropdown = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleButtonClick() {
    this.setState(state => { 
      return { isDropDown: !state.isDropDown }
    });
  }

  handleClickOutside(event) {
    if (this.dropdown.current && !this.dropdown.current.contains(event.target)) {
      this.setState(state => {
        return { isDropDown: false }
      })
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <div className="dropdown" ref={this.dropdown}>
        <button className="dropdownBtn" onClick={this.handleButtonClick}>☰</button>
        { this.state.isDropDown && (
          <div className="dropdownList"> 
            <ul>
              {this.props.children}
            </ul>
          </div>
        )}
        </div>
    )
  }
}

export default Dropdown;