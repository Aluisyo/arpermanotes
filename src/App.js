import React from 'react';
import 'antd/dist/antd.css';
import Wallet from './hooks/Wallet';
import {Layout, Typography, Button} from 'antd';
import Key from './components/Key';
import Dashboard from './components/Dashboard';

const {Header, Content, Footer} = Layout;
const {Title} = Typography;

const App = () => {
    const [{wallet, walletAddress}, setWallet] = Wallet();

    return (
        <Layout className="layout">
            <Header style={{backgroundColor: '#000000'}}>
                <Title style={{color: 'white', padding: '15px'}} level={3}>
                    Permanotes
                </Title>
            </Header>
            <Content style={{padding: '25px 50px'}}>
                <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                    {wallet ? (
                        <Dashboard walletAddress={walletAddress} wallet={wallet}/>
                    ) : (
                        <Key setWallet={setWallet}/>
                    )}
                </div>
				<div>

		   <Button>
				
                <a href="https://tokens.arweave.org/#/wallet"
				
                size="large"
                style={{width: '98%', margin: 'auto'}}
            >
                GET A WALLET WITH SOME TOKENS </a>
            </Button>
			</div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Permanotes © 2019 | Created with Love By Aluisyo
            </Footer>
        </Layout>
    );
};

export default App;
