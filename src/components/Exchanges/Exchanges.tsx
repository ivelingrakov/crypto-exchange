import React, { useContext } from 'react';
import { ExchangeContext } from '../../exchange/exchange-context';
import Exchange from '../Exchange/Exchange';
import Container from '../Container/Container';
import exchanges from '../../exchanges';

import styles from './Exchanges.module.css';
import { compareFn } from '../../utils';
import { Context } from '../../utils/types';

const Exchanges: React.FC = () => {
  const { state }: Context = useContext(ExchangeContext) as Context;
  return <Container className={styles.container}>
    {exchanges.map(({ title }: any) => ({
      price: state[title].current,
      title,
      data: { ...state[title] }
    }
    ))
      .sort((first, second) => compareFn(first, second, state.order))
      .map(({ title, data: { current, loading, direction } }, idx) => {
        return <Exchange
          key={idx}
          title={title}
          current={current}
          loading={loading}
          direction={direction}
        />
      })}
  </Container>
};

export default Exchanges;