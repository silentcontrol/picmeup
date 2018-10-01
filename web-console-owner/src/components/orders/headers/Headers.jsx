import React from 'react'
import './Headers.css'

const capitalize = (resourceString) => {
  return resourceString.charAt(0).toUpperCase() + resourceString.slice(1);
}

const Headers = ({ resource }) => {
  const orderHeader = capitalize(resource);
  return (
    <div>
      <div className="orders-header">
        <h1>{orderHeader}</h1>
      </div>
      <hr />
    </div>
  )
}

export default Headers;