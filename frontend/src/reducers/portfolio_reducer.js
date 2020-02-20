import { RECEIVE_PORTFOLIO } from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const portfolioReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_PORTFOLIO:
      return action.portfolio

    case RECEIVE_CURRENT_USER:
      return {}

    default:
      return state
  }
}

export default portfolioReducer