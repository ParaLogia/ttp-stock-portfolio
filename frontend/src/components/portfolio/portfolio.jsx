import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPortfolio } from '../../actions/transaction_actions'
import PortfolioItem from './portfolio_item'

const Portfolio = ({ stocks, totalValue, fetchPortfolio, transactionIds }) => {
  useEffect(() => {
    fetchPortfolio()
  }, [transactionIds, fetchPortfolio])

  const stockItems = stocks && Object.entries(stocks).map(([ symbol, props ]) => (
    <PortfolioItem key={symbol} symbol={symbol} {...props} />
  ))

  return (
    <section>
      <h1>
        Portfolio {totalValue ? `($${totalValue})` : ''}
      </h1>
      <div>
        <ul>
          {stockItems}
        </ul>
      </div>
    </section>
  )
}

const msp = state => ({
  stocks: state.portfolio.stocks,
  totalValue: state.portfolio.totalValue,
  transactionIds: state.transactions.ids
})

const mdp = {
  fetchPortfolio
}


export default connect(msp, mdp)(Portfolio)