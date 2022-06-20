import React from 'react';
import { Result } from 'antd';
import Layout from '../../components/Layout/Layout';

const NotFound: React.FC = () => (
  <Layout>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  </Layout>
);

export default NotFound;
