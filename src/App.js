// src/App.js
import React from 'react';
import { Layout } from 'antd';
import SoundMeter from './SoundMeter';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px' }}>
        Sound Meter App
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', backgroundColor: '#f0f2f5' }}>
        <SoundMeter />
      </Content>
    </Layout>
  );
};

export default App;
