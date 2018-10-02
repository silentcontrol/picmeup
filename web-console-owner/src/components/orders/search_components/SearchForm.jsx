import React, { Component } from 'react'
import './SearchForm.css'

export default class SearchForm extends Component {
  constructor() {
    super()
    this.state = {
      searchId: ""
    }
  }

  _createRequest = () => {
    let finalSearchId = this.state.searchId
    this.props.getOrderId(finalSearchId)
  }

  _onClick = () => {
    this._createRequest()
  }

  _handleKeyEvent = (e) => {
    if (e.key === 'Enter') this._createRequest()
  }

  _onKeyDown = (e) => {
    if (e.keyCode === 8 && this.state.searchId.length === 1) this.props.clearOrderInfo()
  }

  _onTextChange = (e) => {
    this.setState({
      searchId: e.target.value
    })
  }

  render() {
    return (
      <div className="search-form">
        <input onChange={this._onTextChange}
          onKeyDown={this._onKeyDown}
          onKeyPress={this._handleKeyEvent}
          name="searchKeyId"
          className="search-input" />
        <button onClick={this._onClick}
          className="search-button">Search</button>
      </div>
    )
  }
}