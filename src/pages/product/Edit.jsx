import React, { useEffect, useState } from 'react'

import { PageHeader, Button, Form, Input, Select} from 'antd';
import { ProductFindByIdApi, ProductUpdateApi, ProductAddApi, CategoryFindApi} from '../../request/api'
import { useParams, useLocation } from 'react-router-dom'
const { Option } = Select;

export default function Edit() {

    const location = useLocation()
    const params = useParams()
    const [form] = Form.useForm()
    const [type,setType] = useState()
    let [categoryMap,setCategoryMap] = useState([])

    useEffect(() => {
        getCategory()
        // 根据地址栏id做请求
        if (params.id) {
            setType("修改")
            ProductFindByIdApi(params.id).then(res => {
                console.log(res)
                form.setFieldsValue(res)
            })
        }else{
            setType("新增")
        }
        return () => {
        }
    }, [])

    // 从后端获取分类信息
    const getCategory =() =>{
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
            alert('操作成功!')
        } else {
            alert('操作失败!')
        }
    }

    // 提交表单成功的操作
    const onFinish = (values) => {
        console.log('Success:', values);
        if (params.id) {
            ProductUpdateApi(values).then((res) => parseResStatus(res))
        }else{
            ProductAddApi(values).then((res) => parseResStatus(res))
        }
    };

    // 提交表单失败的操作
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const renderOption = (arr) => arr ? arr.map(item =>{
        return (<Option key={item.id} value={item.id}>{item.name}</Option>)
    }) : null

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
                        rules={[{required: true,// message: 'Please input your password!', 
                    }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="类别" name="categoryId"
                        rules={[{ required: true }]}>
                        <Select onChange={() => getCategory()}>{renderOption(categoryMap)}</Select>
                    </Form.Item>


                    <Form.Item label="价格" name="price"
                        rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="折扣" name="discount"
                        rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="供应商" name="supplier"
                        rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="图片路径" name="imagePath">
                        <Input/>
                    </Form.Item>

                    <Form.Item label="描述" name="description">
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8,}}>
                        <Button type="primary" htmlType="submit">{type}</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}




