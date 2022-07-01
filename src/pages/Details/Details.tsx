import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Descriptions, Empty, Badge } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Layout from '../../components/Layout/Layout';
import Container from '../../components/Container/Container';
import Spinner from '../../components/Spinner/Spinner';
import { extractPair } from '../../utils';

import styles from './Details.module.css';

const Details: React.FC = () => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const pair = extractPair(pathname);
    setLoading(true);
    fetch(`https://api.binance.com/api/v3/exchangeInfo?symbol=${pair}`)
      .then(res => res.json()).then(data => data?.symbols && setDetails(data.symbols[0]))
      .finally(() => setLoading(false));
  }, [])

  return <Layout>
    {loading ?
      <Spinner /> :
      <Container className={styles.container}>
        {details ? <Descriptions title={`${details.symbol} data @ Binance`} bordered>
          <Descriptions.Item label="Status" span={3}>
            <Badge status={details.status === 'TRADING' ? 'success' : 'error'} size="default" text={details.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Base Asset"><b>{details.baseAsset}</b></Descriptions.Item>
          <Descriptions.Item label="Base Asset Precision">{details.baseAssetPrecision}</Descriptions.Item>
          <Descriptions.Item label="Base Commission Precision">{details.baseCommissionPrecision}</Descriptions.Item>
          <Descriptions.Item label="Quote Asset"><b>{details.quoteAsset}</b></Descriptions.Item>
          <Descriptions.Item label="Quote Asset Precision">{details.quoteAssetPrecision}</Descriptions.Item>
          <Descriptions.Item label="Quote Commission Precision">{details.quoteCommissionPrecision}</Descriptions.Item>
          <Descriptions.Item label="Cancel Replace Allowed">{details.cancelReplaceAllowed ? <CheckOutlined /> : <CloseOutlined />}</Descriptions.Item>
          <Descriptions.Item label="Iceberg Allowed">{details.icebergAllowed ? <CheckOutlined /> : <CloseOutlined />}</Descriptions.Item>
          <Descriptions.Item label="Margin Trading Allowed">{details.isMarginTradingAllowed ? <CheckOutlined /> : <CloseOutlined />}</Descriptions.Item>
          <Descriptions.Item label="Spot Trading Allowed ">{details.isSpotTradingAllowed ? <CheckOutlined /> : <CloseOutlined />}</Descriptions.Item>
          <Descriptions.Item label="OCO Asset">{details.ocoAllowed ? <CheckOutlined /> : <CloseOutlined />}</Descriptions.Item>
          <Descriptions.Item label="Quote Order QTY Market Asset">{details.quoteOrderQtyMarketAllowed ? <CheckOutlined /> : <CloseOutlined />}</Descriptions.Item>
        </Descriptions> : <Empty
          description={`${extractPair(pathname).toUpperCase()} missing data @ Binance`}
        />}
      </Container>
    }
  </Layout>
}

export default Details