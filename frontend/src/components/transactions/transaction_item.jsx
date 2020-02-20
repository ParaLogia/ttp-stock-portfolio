import React from 'react'

const TransactionItem = ({ symbol, quantity, unitPrice, date }) => {
  const formattedDate = new Date(date).toLocaleString()
  return (
    <li>
      <p>
        {formattedDate}
      </p>
      <p>
        BUY ({symbol}) - {quantity} {quantity === 1 ? 'Share' : 'Shares'} @ {unitPrice} ea.
      </p>
    </li>
  )
}

export default TransactionItem