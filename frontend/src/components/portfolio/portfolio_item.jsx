import React from 'react'

const PortfolioItem = ({ symbol, quantity, unitPrice, totalPrice, trend }) => {
  return (
    <li>
      <div>
        {symbol} - {quantity} {quantity === 1 ? 'Share' : 'Shares'}
      </div>
      <div>
        ${totalPrice}
      </div>
    </li>
  )
}

export default PortfolioItem