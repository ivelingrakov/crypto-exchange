
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Select, Form } from 'antd';
import { ExchangeContext } from '../../exchange/exchange-context';
import Container from '../Container/Container';

import styles from './Search.module.css';
import { SortOrder } from '../../utils/types';
import { extractBase, extractPair, extractQuote } from '../../utils';
import classNames from 'classnames';

const Main: React.FC = () => {
  const [base, setBase] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dispatch }: any = useContext(ExchangeContext);

  const onSearch = () => {

    navigate(`/${base}/${quote}`);
  }

  useEffect(() => {
    if (pathname.length > 1) {
      setBase(extractBase(pathname).toUpperCase());
      setQuote(extractQuote(pathname).toUpperCase());
    }
    dispatch({ type: 'SET_LOADING' });
  }, [pathname])

  return <Container className={styles.container}>
    <Container>
      <Input.Group compact>
        <Input 
          className={styles.centered}
          value={base}
          onChange={({ target: { value } }) => setBase(value.toUpperCase())}
          style={{ width: '80px' }}
          placeholder="NEXO"
          onKeyDown={({ key }) => key === 'Enter' && onSearch()}
        />
        <Input.Search
          className={styles.centered}
          value={quote}
          onChange={({ target: { value } }) => setQuote(value.toUpperCase())}
          addonBefore="/"
          style={{ width: '130px' }}
          placeholder="USDT"
          onSearch={onSearch}
        />
      </Input.Group>
    </Container>
    <Select
      placeholder="Sort"
      className={classNames([styles.select, styles.centered])}
      onChange={payload => dispatch({ type: 'SET_ORDER', payload })}
    >
      <Select.Option value={SortOrder.Ask}>Price increase</Select.Option>
      <Select.Option value={SortOrder.Desk}>Price decrease</Select.Option>
    </Select>
  </Container>
}

export default Main