import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Modal as AntdModal, Table, Tag } from 'antd';
import exchanges from '../../exchanges';
import { extractPair, formatTime } from '../../utils';
import { Trade } from '../../utils/types';

type Props = {
  exchangeName: string
  visible: boolean
  close: () => void
}

const Modal: React.FC<Props> = ({ exchangeName, visible, close }) => {
  const [pair, setPair] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [trades, setTrades] = useState<Trade[]>([])
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.length > 1) {
      setPair(extractPair(pathname).toUpperCase());
    }
  }, [pathname]);

  useEffect(() => {
    const exchange = exchanges.find(x => x.title === exchangeName);
    if (visible) {
      const { getHistoricalInfoUrl, historicalDataParser } = exchange!;
      const url = getHistoricalInfoUrl(pair);
      setLoading(true);
      fetch(`/proxy?target=${encodeURIComponent(url)}`).then(res => res.json()).then(res => {
        const data = historicalDataParser(res);
        data && setTrades(data);
      }).finally(() => setLoading(false))
    }
  }, [exchangeName, visible]);

  return (
    <AntdModal
      title={`${pair} trade history @ ${exchangeName[0].toUpperCase()}${exchangeName.slice(1)}`}
      visible={visible}
      onCancel={close}
      footer={[]}
    >
      <Table
        size="small"
        loading={loading}
        dataSource={trades}
        pagination={{ showSizeChanger: false }}
      >
        <Table.Column
          title="Time"
          dataIndex="time"
          key="time"
          render={time => formatTime(time)}
        />
        <Table.Column
          title="Operation"
          dataIndex="operation"
          key="operation"
          render={operation =>
            <Tag color={operation === 'Buy' ? 'green' : 'red'} key={'operation'}>
              {operation}
            </Tag>
          }
        />
        <Table.Column
          title="Volume"
          dataIndex="volume"
          key="volume"
        />
        <Table.Column
          title="Price"
          dataIndex="price"
          key="price"
        />
      </Table>
    </AntdModal>
  );
};

export default Modal;