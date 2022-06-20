
import React from 'react';
import { Layout as AntdLayout, PageHeader } from 'antd';

import styles from './Layout.module.css';

type Props = { children: React.ReactNode }

const Layout: React.FC<Props> = ({ children }) => {
  return <AntdLayout className={styles.layout}>
    <PageHeader
      className="site-page-header"
      title="Crypto Exchange"
    />
    <AntdLayout.Content className={styles.content}>
      {children}
    </AntdLayout.Content>
  </AntdLayout>
}

export default Layout