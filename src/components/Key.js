import React, {Fragment} from 'react';
import {Upload, Icon, message} from 'antd';

const {Dragger} = Upload;

const Key = ({setWallet}) => {
    const handleKeyUpload = info => {
        const {status} = info.file;
        if (status === 'uploading') return;

        if (status === 'error') {
            console.log(info);
            return message.error(`${info.file.name} file upload failed.`);
        }

        const file = info.file.originFileObj;
        const filereader = new FileReader();

        filereader.addEventListener('loadend', async event => {
            try {
                const wallet = JSON.parse(event.target.result);
                await setWallet(wallet);
            } catch (e) {
                message.error(`Something went wrong please try again.`);
                console.log(e);
            }
        });

        filereader.readAsText(file);
    };

    const fakeCustomRequest = ({_, onSuccess}) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    return (
        <Fragment>
            <Dragger
                name="key"
                multiple={false}
                onChange={handleKeyUpload}
                customRequest={fakeCustomRequest}
                accept="application/json"
            >
                <p className="ant-upload-drag-icon">
                    <Icon type="key"/>
                </p>
                <p className="ant-upload-text">Click or drag wallet keyfile to this area to login</p>

            </Dragger>
            <p className="ant-upload-text" onClick={_ => {
                const data = localStorage.getItem('wallet');
                if (data) {
                    setWallet(JSON.parse(data));
                } else {
                    alert('Storage is empty. Please, use file selector');
                }

            }}>
			</p>
        </Fragment>
    );
};

export default Key;
