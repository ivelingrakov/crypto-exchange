import React from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'antd';
import Layout from '../../components/Layout/Layout';

const NotFound: React.FC = () => (
  <Layout>
    <Result
      status="404"
      title="404"
      subTitle={<div>Sorry, the page you visited does not exist. Try <Link to='/NEXO/USDT'>NEXO/USDT</Link></div>}
    />
  </Layout>
);

export default NotFound;
