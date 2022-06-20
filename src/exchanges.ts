import { Trade } from './utils/types';
const count = 1000;

type Exchange = {
  title: string
  getPriceUrl: (pair: string) => string
  getHistoricalInfoUrl: (pair: string) => string
  priceDataParser: (data: any) => number | undefined
  historicalDataParser: (data: any) => Trade[] | undefined
}

export default [{
  title: 'binance',
  getPriceUrl: (pair: string) => `https://api.binance.com/api/v3/ticker/price?symbol=${pair.toUpperCase()}`,
  getHistoricalInfoUrl: (pair: string) => `https://api.binance.com/api/v3/trades?symbol=${pair.toUpperCase()}&limit=${count}`,
  priceDataParser: (data: any): number | undefined => data && parseFloat(data?.price),
  historicalDataParser: (data: any): Trade[] | undefined =>
    !!data && data.map(x => ({
      price: parseFloat(x.price),
      volume: parseFloat(x.qty),
      time: x.time,
      operation: x.isBuyerMaker ? 'Buy' : 'Sell'
    })).reverse()
}, {
  title: 'bitfinex',
  getPriceUrl: (pair: string) => `https://api-pub.bitfinex.com/v2/tickers?symbols=t${pair.toUpperCase()}`,
  getHistoricalInfoUrl: (pair: string) => `https://api-pub.bitfinex.com/v2/trades/t${pair.toUpperCase()}/hist?limit=${count}`,
  priceDataParser: (data: any): number | undefined => data && data[0] && parseFloat(data[0][7]),
  historicalDataParser: (data: any): Trade[] | undefined =>
    !!data && data.map(x => ({
      price: parseFloat(x[3]),
      volume: Math.abs(parseFloat(x[2])),
      time: new Date(x[1]),
      operation: x[2] > 0 ? 'Buy' : 'Sell'
    }))
}, {
  title: 'huobi',
  getPriceUrl: (pair: string) => `https://api.huobi.pro//market/detail/merged?symbol=${pair.toLowerCase()}`,
  getHistoricalInfoUrl: (pair: string) => `https://api.huobi.pro/market/history/trade?symbol=${pair.toLowerCase()}&size=${count}`,
  priceDataParser: (data: any): number | undefined => {
    if (data && data.status === 'ok' && data.tick?.ask?.length) {
      return parseFloat(data.tick.ask[0]);
    }
  },
  historicalDataParser: (data: any): Trade[] | undefined => {
    if (data.status === 'ok' && !!data?.data) {
      return data.data.map(x => ({
        price: parseFloat(x.data[0].price),
        volume: parseFloat(x.data[0].amount),
        time: x.data[0].ts,
        operation: `${x.data[0].direction[0].toUpperCase()}${x.data[0].direction.slice(1)}` // x.data[0].direction
      }
      ));
    }
  }
}, {
  title: 'kraken',
  getPriceUrl: (pair: string) => `https://api.kraken.com/0/public/Ticker?pair=${pair.toUpperCase()}`,
  getHistoricalInfoUrl: (pair: string) => `https://api.kraken.com/0/public/Trades?pair=${pair.toUpperCase()}&limit=${count}`,
  priceDataParser: (data: any): number | undefined => {
    if (!!data.result) {
      try {
        return parseFloat(data.result[Object.keys(data.result)[0]].a[0]);
      } catch {
        return undefined;
      }
    }
  },
  historicalDataParser: (data: any): Trade[] | undefined => {
    if (!!data?.result) {
      try {
        const operations = { s: 'Sell', b: 'Buy' }
        const slicedData = data.result[Object.keys(data.result)[0]].slice(0, count);
        return slicedData.map(data => ({
          price: parseFloat(data[0]),
          volume: parseFloat(data[1]),
          time: new Date(data[2]),
          operation: operations[data[3]]
        }
        ));
      } catch {
        return undefined;
      }
    }
  }
}] as Exchange[]