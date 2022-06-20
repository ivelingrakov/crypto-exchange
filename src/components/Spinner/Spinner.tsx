import React from 'react';
import { Spin } from 'antd';
import Container from '../../components/Container/Container';

import styles from './Spinner.module.css';

const Spinner: React.FC = () => {
  return <Container className={styles.container}>
    <Spin />
  </Container>
}

export default Spinner