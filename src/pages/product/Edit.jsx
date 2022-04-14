import React, { useEffect, useState } from 'react'

import { UploadOutlined } from '@ant-design/icons';
import { PageHeader, Button, Form, Input, Select, Space, Upload, message } from 'antd';
import { ProductFindByIdApi, ProductUpdateApi, ProductAddApi, CategoryFindApi, UploadApi } from '../../request/api'
import { useParams } from 'react-router-dom'
const { Option } = Select;

export default function Edit() {

    const params = useParams()
    const [form] = Form.useForm()
    const [type, setType] = useState()
    let [categoryMap, setCategoryMap] = useState([])

    useEffect(() => {
        getCategory()
        // 根据地址栏id做请求
        if (params.id) {
            setType("修改")
            ProductFindByIdApi(params.id).then(res => {
                console.log(res)
                form.setFieldsValue(res)
                if(res.imagePath!==null){
                    setFileList([{
                        uid: '-1',
                        status: 'done',
                        name: res.imagePath,
                        url: res.imagePath,
                    }])
                }
                console.log(fileList)
            })
        } else {
            setType("新增")
        }
        return () => {
        }
    }, [])

    // 从后端获取分类信息
    const getCategory = () => {
        CategoryFindApi().then(res => {
            console.log(res)
            categoryMap = res;
            setCategoryMap(categoryMap);
            console.log(categoryMap)
        })
    }

    // 判断操作是否成功 true ? false
    const parseResStatus = (status) => {
        if (status === true) {
            message.success('操作成功!');
        } else {
            message.error('操作失败!');
        }
    }

    // 提交表单成功的操作
    const onFinish = (values) => {
        console.log('Success:', values);
        if (params.id) {
            ProductUpdateApi(values).then((res) => parseResStatus(res))
        } else {
            ProductAddApi(values).then((res) => parseResStatus(res))
        }
    };

    // 提交表单失败的操作
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const renderOption = (arr) => arr ? arr.map(item => {
        return (<Option key={item.id} value={item.id}>{item.name}</Option>)
    }) : null

    const [fileList, setFileList] = useState([])

    const upload = (item) => {
        // this.createForm.paths = '';
        const formData = new FormData();
        formData.append('file', item.file);
        formData.append('paramCode', 'data_source');
        setFileList(null);
        UploadApi(formData).then((res) => {
            console.log(res);
            if (res!== null) {
                fileList.pop();
                fileList.push(
                    {
                        uid: '-1',
                        status: 'done',
                        name: res,
                        url: res,
                    });
                form.setFieldsValue({"imagePath":res})
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
        <div className="site-page-header-ghost-wrapper">
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={type}
            // subTitle="This is a subtitle"
            >
                <Form name="basic" labelCol={{ span: 8, }}
                    wrapperCol={{ span: 12, }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >

                    <Form.Item label="id" name="id" hidden={true}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="名称" name="name"
                        rules={[{
                            required: true,// message: 'Please input your password!', 
                        }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="类别" name="categoryId"
                        rules={[{ required: true }]}>
                        <Select onChange={() => getCategory()}>{renderOption(categoryMap)}</Select>
                    </Form.Item>


                    <Form.Item label="价格" name="price"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="折扣" name="discount"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="供应商" name="supplier"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="图片" name="imagePath">
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Upload
                                accept=".jpg,.gif,.png"
                                listType="picture"
                                fileList={fileList}
                                maxCount={1}
                                customRequest={upload}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Space>
                        {/* <Input /> */}
                    </Form.Item>



                    <Form.Item label="描述" name="description">
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, }}>
                        <Button type="primary" htmlType="submit">{type}</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}




