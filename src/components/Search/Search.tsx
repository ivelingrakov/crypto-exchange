
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Select } from 'antd';
import { ExchangeContext } from '../../exchange/exchange-context';
import Container from '../Container/Container';

import styles from './Search.module.css';
import { NotificationType, SortOrder } from '../../utils/types';
import { showNotification } from '../../utils/notifications';
import { extractBase, extractQuote } from '../../utils';
import classNames from 'classnames';

const getNotificationDetails = (titlePlaceholder: string, messagePlaceholder: string) =>
  [`Empty ${titlePlaceholder}currency pair`, `Please add ${messagePlaceholder} currency`]

const isValidPair = (base: string, quote: string): boolean => {
  switch (true) {
    case !base.trim() && !quote.trim():
      showNotification(NotificationType.Warning, ...getNotificationDetails('', 'base and quote'));
      return false;
    case !base.trim():
      showNotification(NotificationType.Warning, ...getNotificationDetails('base ', 'base'));
      return false;
    case !quote.trim():
      showNotification(NotificationType.Warning, ...getNotificationDetails('quote ', 'quote'));
      return false;
    default:
      return true;
  }
  // add additional validation
}

const Main: React.FC = () => {
  const [base, setBase] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dispatch }: any = useContext(ExchangeContext);

  const onSearch = () =>
    isValidPair(base, quote) && navigate(`/${base}/${quote}`);

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