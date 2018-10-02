import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = ({message}) => {
  return (
    <div className="is-error">
      {message}
    </div>
  )
}

export default ErrorMessage;