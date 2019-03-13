import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.state = ({
        showOptions: true
    })

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log('you clicked outside of me!',this.props.showOptions);
      this.setState({showOptions:false})
    }
  }

  render() {
      console.log(this.state.showOptions);
    return <div 
                ref={this.setWrapperRef}
                outsidestatus = {this.state.showOptions}
            >
            {this.props.children}
            </div>;
  }
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};
