import React from 'react'

const TransactionItem = ({ symbol, quantity, unitPrice, date }) => {
  // const formattedDate = new Date(date).toLocaleString()
  return (
    <li className="scroller-item neutral">
      <div>
        BUY <span className="symbol">{`(${symbol})`}</span> {quantity} {quantity === 1 ? 'Share' : 'Shares'}
      </div>
      <div className="price">
        ${unitPrice} ea.
      </div>
    </li>
  )
}

export default TransactionItem