import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Menu } from 'antd';

import { UsergroupAddOutlined } from '@ant-design/icons';

import Form from './Form';

const FormModal = ({currentId, setCurrentId}) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <a type="primary" onClick={showModal}>
            <Button type="primary" shape="round" icon={<UsergroupAddOutlined />} size='large' style={{backgroundColor: '#001428', borderColor: '#001428', zIndex: '1', position: 'absolute', bottom: '5%', right: '5%'}}>
                Create a Team
            </Button>
            </a>
            <Modal
                visible={visible}
                width={500}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                      Return
                    </Button>,
                ]}
            >
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Modal>
        </>
    );
};

export default FormModal;