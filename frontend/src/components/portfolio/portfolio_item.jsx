import React from 'react'

const PortfolioItem = ({ symbol, quantity, unitPrice, totalPrice, trend }) => {
  const trendClass = (trend > 0) ? 'positive' : (trend < 0) ? 'negative' : 'neutral'
  return (
    <li className={`scroller-item ${trendClass}`}>
      <div>
        <span className="symbol">
          {symbol}
        </span>
        <i>
          {quantity} {quantity === 1 ? 'Share' : 'Shares'}
        </i>
      </div>
      <div className="price">
        ${unitPrice}
      </div>
    </li>
  )
}

export default PortfolioItem