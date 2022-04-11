import React, { useEffect, useState } from 'react'

import { PageHeader, Button, Form, Input} from 'antd';
import { ProductFindByIdApi, ProductUpdateApi, ProductAddApi} from '../../request/api'
import { useParams, useLocation } from 'react-router-dom'

export default function Edit() {

    const location = useLocation()
    const params = useParams()
    const [form] = Form.useForm()
    const [type,setType] = useState('')

    useEffect(() => {
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
    }, [form, location.pathname, params.id])

    const onFinish = (values) => {
        console.log('Success:', values);
        if (params.id) {
            ProductUpdateApi(values).then((res) => {
                if(res===true) {
                    alert('修改成功!')
                }else{
                    alert('修改失败!')
                }
            })
        }else{
            ProductAddApi(values).then((res) => {
                console.log(res.data)
                if(res.data===true) {
                    alert('新增成功!')
                }else{
                    alert('新增失败!')
                }
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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

                    <Form.Item label="categoryId" name="categoryId"
                        rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="price" name="price"
                        rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="discount" name="discount"
                        rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="supplier" name="supplier"
                        rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="imagePath" name="imagePath">
                        <Input/>
                    </Form.Item>

                    <Form.Item label="description" name="description">
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




