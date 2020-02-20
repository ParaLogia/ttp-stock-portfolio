import React from 'react'

const PortfolioItem = ({ symbol, quantity, unitPrice, totalPrice, trend }) => {
  return (
    <li>
      {symbol} x{quantity} = ${totalPrice}
    </li>
  )
}

export default PortfolioItem