# ttp-stock-portfolio
Full-stack portfolio app built for the NYC Tech Talent Pipeline coding challenge.

[Live link](https://ttp-stocks-phi.herokuapp.com/)

## Technologies
This app is built on the MERN stack (MongoDB, ExpressJS, React, NodeJS) and is hosted on Heroku. Additionally, the frontend incorporates Redux state management with React hooks.

The server uses [big.js](http://mikemcl.github.io/big.js/) for accurate decimal calculations, preventing floating point errors in financial data. Additionally, the server uses [bcrypt.js](https://www.npmjs.com/package/bcryptjs) and [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) for secure user authentication.

### Example snippets
The following code is used in a React component to query the API for up-to-date prices at regular intervals:
```js
  const loaded = useRef(false);
  const timer = useRef(null);

  // Query the api for market prices every 8 seconds
  const subscribeToMarket = () => {
    fetchPortfolio()
    timer.current = window.setTimeout(subscribeToMarket, 8000)
  }

  useEffect(() => {
    loaded.current = true
    subscribeToMarket()

    return () => {
      window.clearTimeout(timer.current);
    }
  }, [transactionIds, fetchPortfolio])

```
Note that the `timer` reference is preserved across renders so that it can be cleared during component cleanup, i.e. in the callback returned in the `useEffect` callback.

This function composes a request to a 3rd party API, querying a batch of stock symbols for their pricing data. The function returns a `Promise` with the response data.
```js
const getQuotes = (symbols) => {
  const symbolNames = symbols.map(encodeURIComponent).join(',')
  const subdomain = (process.env.NODE_ENV === "production") ? 'cloud' : 'sandbox'
  const url = 
    `https://${subdomain}.iexapis.com/stable/stock/market/batch?types=quote`
    + `&symbols=${symbolNames}&token=${iexToken}`
    + "&filter=symbol,latestPrice,previousClose,open"

  return axios.get(url)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    })
}
```
The request defaults to a sandbox API in non-production environments. The token is also loaded differently, depending on the environment. This avoids overloading the real API during testing.

## Credits
Stock prices are obtained from [IEX Cloud](https://iexcloud.io/) API.
