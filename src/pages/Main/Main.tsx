
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import IntervalManager from '../../utils/intervalManager';
import { ExchangeContext } from '../../exchange/exchange-context';
import exchanges from '../../exchanges';
import Layout from '../../components/Layout/Layout';
import Search from '../../components/Search/Search';
import Exchanges from '../../components/Exchanges/Exchanges';
import { extractPair } from '../../utils';

const Main: React.FC = () => {
  const { pathname } = useLocation();
  const { dispatch }: any = useContext(ExchangeContext);
  const intervals: any = exchanges.reduce((acc, { title }) => ({
    ...acc,
    [title.toLowerCase()]: new IntervalManager(2000)
  }), {});

  useEffect(() => {
    if (pathname.length > 1) {
      const pair = extractPair(pathname);
      exchanges.forEach(({ title: exchange, getPriceUrl, priceDataParser }) => {
        const priceUrl = getPriceUrl(pair);
        intervals[exchange]?.setCallback(() =>
        fetch(`http://localhost:3003?target=${encodeURIComponent(priceUrl)}`)
            .then(res => res.json())
            .then(res => {
              const price = priceDataParser(res);
              !price && intervals[exchange]?.stopInterval();
              dispatch({ type: 'SET_PRICE', payload: { exchange, price } })
            }).catch(() => intervals[exchange]?.stopInterval()))
        intervals[exchange]?.startInterval();
      })
    } else {
      dispatch({ type: 'RESET_DATA' })
    }
    return () => Object.keys(intervals).forEach(interval =>
      intervals[interval].stopInterval()
    )
  }, [pathname])

  return <Layout>
    <Search />
    <Exchanges />
  </Layout>
}

export default Main