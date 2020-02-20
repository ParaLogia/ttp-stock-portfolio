import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPortfolio } from '../../actions/transaction_actions'
import PortfolioItem from './portfolio_item'
import '../../styles/portfolio.css'

const Portfolio = ({ stocks, totalValue, fetchPortfolio, transactionIds }) => {
  useEffect(() => {
    fetchPortfolio()
  }, [transactionIds, fetchPortfolio])

  const stockItems = stocks && Object.entries(stocks).map(([ symbol, props ]) => (
    <PortfolioItem key={symbol} symbol={symbol} {...props} />
  ))

  return (
    <div className="list-container">
      <section className="list">
        <h1>
          Portfolio {totalValue ? `($${totalValue})` : ''}
        </h1>
        <div className="scroller">
          <ul className="scroller-list">
            {stockItems}
          </ul>
        </div>
      </section>
    </div>
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