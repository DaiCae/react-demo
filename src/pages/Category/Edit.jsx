import React, { useEffect, useState } from 'react'

import { PageHeader, Button, Form, Input, message } from 'antd';
import { CategoryFindByIdApi, CategoryUpdateApi, CategoryAddApi, CategoryFindApi } from '../../request/api'
import { useParams } from 'react-router-dom'

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
            CategoryFindByIdApi(params.id).then(res => {
                console.log(res)
                form.setFieldsValue(res)
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
            CategoryUpdateApi(values).then((res) => parseResStatus(res))
        } else {
            CategoryAddApi(values).then((res) => parseResStatus(res))
        }
    };

    // 提交表单失败的操作
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
                        rules={[{
                            required: true,// message: 'Please input your password!', 
                        }]}>
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




