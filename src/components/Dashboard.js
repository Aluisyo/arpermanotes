import React, {useState, useEffect} from 'react';
import {getAllPortfolioTransactions} from '../api';
import {Button, message, Row, Col, Input, notification} from 'antd';
import {upload } from '../api';
import './wow.css';
import AddTransaction from './AddTransaction';

const Dashboard = ({walletAddress, wallet}) => {
    const [portfolioTransactions, setPortfolioTransactions] = useState([]);
    const [addTransactionVisible, setAddTransactionVisible] = useState(false);
    const [textTitle, setTextTitle] = useState('');
    const [textNotes, setTextNotes] = useState('');

    const statusNothing = 'nothing';
    const statusUploading = 'uploading';
    const statusUploaded = 'uploaded';

    let uploadFileRef = React.createRef();
    let [UploadingStatus, setStatus] = useState(statusNothing);

    const onUpload = info => {
        const input = uploadFileRef.current;
        input.value = null;
        input.onchange = () => {
            console.log(uploadFileRef.current.files);

        };

        input.accept = "file/*";
        input.click();

    };
    const SavetextTitle =(e)=> {
        setTextTitle(e.target.value)
    };

     const SavetextNotes =(e)=> {
        setTextNotes(e.target.value)
    };
   
  const success = () => {
  const hide = message.loading('Uploading Notes to Arweave Blockchain...', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};
   
const openNotification = () => {
  notification.open({
    message: 'Notification',
    description:
      'Notes Saved! Notes will be displayed after being mined in a block, check back soon.',
	duration: 10,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
   
  
      

    
    const Save =()=> {
         const filereader = new FileReader();
            filereader.addEventListener('loadend', async event => {
                try {
                    setStatus(statusUploading);
                    console.log(event.target.result);
                    const result = await upload(event.target.result,textTitle, textNotes, wallet);
                    setStatus(statusUploaded);
                    console.log(result);
                } catch (e) {
                    console.log(e);
                }
            });

            filereader.readAsDataURL(uploadFileRef.current.files[0]);
            setTextTitle('');
            setTextNotes('');
        }

    useEffect(() => {
        getAllPortfolioTransactions(walletAddress).then(setPortfolioTransactions);
    }, [walletAddress]);
    const objparce = portfolioTransactions.filter(item => item[0]+item[2]+item[3]+item[4]+item[5]==="{ph1l");


    return (
        <Row>
        <Col span={9} >
        <Col span={24} >            
        </Col>
           <Col span={24} >
            <h1>Welcome To Permanotes</h1>
            <Input type="text" value={textTitle} onChange={SavetextTitle} placeholder="Enter your title" />
            </Col>
			<Col span={5} >
            </Col>
            <Col span={24} >
            <Input.TextArea type="text" value={textNotes} onChange={SavetextNotes} placeholder="Enter your notes" style={{height: '200px'}} />
            </Col>
			

			<Button
			    icon="upload"
                onClick={() => onUpload()}
                type="file"
                size="large"
            >
                Add a file to note
            </Button>
           
            <Button
			    type="primary"
                onClick={() =>{ Save(); success(); openNotification()}}
                size="large"
                style={{width: '80%', margin: '15px'}}
            >
                Save
            </Button>
            </Col>


            <Col span={15} >
            <input type="file" ref={uploadFileRef} style={{display: 'none'}} />

            {UploadingStatus === statusUploading ? <div>

            </div> : <span/>}
            {UploadingStatus === statusUploaded ?
                <div>
                </div> : <span/>}

            {objparce.length ?
                <div>
                    {objparce.map((item, index) => {


                    const obj = JSON.parse(item)
   
                        console.log(item);
                        return (
                            <Col span = {12} key={index} className="card">
                            <h2>{obj.text}</h2>
                            <embed  src={obj.ph1loto} alt="User" style={{width: '100%'}}/>
							<a href={obj.ph1loto} download> Download </a>
                            <div className="container">
                            <p>{obj.text2}</p>
                            </div>
                            </Col>
                            )
                       
                   })}
                </div>
                :
                <div>
                    <h2>Your Permanotes</h2>
                    <p align="center">
                        Your Permanotes will apear here once minted on blockchain.
                    </p>
                </div>
            }

            <AddTransaction
                visible={addTransactionVisible}
                closeModal={() => {
                    setAddTransactionVisible(false);
                }}
                wallet={wallet}
            />
            </Col>
        </Row>
    );
};

export default Dashboard;