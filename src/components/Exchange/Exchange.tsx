import React, { useState } from 'react';
import classNames from 'classnames';
import { Card, Col, Empty, Skeleton } from 'antd';

import Modal from '../Modal/Modal';
import { Direction } from '../../utils/types';

import styles from './Exchange.module.css';

type Props = {
  title: string
  current: number
  direction: Direction
  loading: boolean
}

const Exchange: React.FC<Props> = ({ title, current, direction, loading }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return <>
    <Modal
      exchangeName={title}
      visible={showModal}
      close={() => setShowModal(false)}
    />
    <Col span={6} offset={9} className={styles.container}>
      <Card title={`${title[0].toUpperCase()}${title.slice(1)}`}>
        <Skeleton active paragraph={{ rows: 0 }} loading={loading}>
          {!!current
            ? <span
              className={classNames([styles[direction], styles.price])}
              onClick={() => current && setShowModal(true)}
            >
              {current}
            </span>
            : <Empty imageStyle={{ height: 40 }} />}
        </Skeleton>
      </Card>
    </Col>
  </>
}
export default Exchange;