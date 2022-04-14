import React, { useState } from 'react'
import { Upload, Button, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadApi } from '../request/api';

export default function Test() {
    const [fileList, setFileList] = useState([])


    const upload = (item) => {
        // this.createForm.paths = '';
        const formData = new FormData();
        formData.append('file', item.file);
        formData.append('paramCode', 'data_source');
        UploadApi(formData).then((res) => {
            console.log(res);
            if (res!== null) {
                fileList.push({ name: item.file.name });
                message.success('上传成功');
                item.onSuccess();   // 上传成功后结束文件上传转圈状态
            } else {
                message.error('上传失败');
                item.onError();     // 返回报错
            }
            setFileList(fileList);
        });
    }


    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Upload
                    accept=".jpg,.gif,.png"
                    customRequest={upload}  
                    listType="picture"
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Space>
        </div>
    )
}



