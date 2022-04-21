import React, { useEffect, useState } from 'react'

import { UploadOutlined } from '@ant-design/icons';
import { PageHeader, Button, Form, Input, Row, Card, Col, Select, Space, Upload, message } from 'antd';
import { ProductFindByIdApi, ProductUpdateApi, ProductAddApi, CategoryFindApi, UploadApi } from '../../request/api'
import { useParams } from 'react-router-dom'
const { Option } = Select;

export default function Detail() {

    const params = useParams()
    const [data, setData] = useState({
        name: null,
    })

    useEffect(() => {
        // 根据地址栏id做请求
        if (params.id) {
            ProductFindByIdApi(params.id).then(res => {
                console.log(res)
                setData(res)
                if (res.imagePath !== null) {
                    setFileList([{
                        uid: '-1',
                        status: 'done',
                        name: res.imagePath,
                        url: res.imagePath,
                    }])
                }
            })
        }
        return () => {
        }
    }, [])
    const [fileList, setFileList] = useState([])


    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={16}>
                    <Card title={data.name} bordered={false}>
                    <p>{"价格: "+data.price}</p>
                    <p>{"折扣: "+data.discount}</p>
                    <p>{"供应商: "+data.supplier}</p>
                    <p>{"描述:: "+data.description}</p>
                    {/* <p>{data.imagePath}</p> */}
                    <p><img src={data.imagePath}></img></p>
                    <Button type='primary' >购买</Button>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}
