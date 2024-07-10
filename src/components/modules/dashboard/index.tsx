import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../../layout';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
    </Layout>
  );
};

export default Dashboard;
