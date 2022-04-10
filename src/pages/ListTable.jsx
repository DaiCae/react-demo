/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Table, Button, Input, Row, Col, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { ProductFindApi, ProductDeleteApi, ProductDeleteBatchApi } from '../request/api';
import axios from 'axios'


export default function ListTable() {
    const navigate = useNavigate()
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            render: text => <a href=''>{text}</a>,
        },
        {
            title: '分类',
            dataIndex: 'categoryId',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '折扣',
            dataIndex: 'discount',
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
        },
        {
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => navigate('/edit/' + record.id)}>编辑</Button>
                    <Button type='danger' onClick={() => deleteItem(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];
    const [data, setData] = useState()
    const [ids,setIds] = useState()

    useEffect(() => {
        ProductFindApi().then(res => {
            res.map(x => x.key = x.id)
            console.log(res)
            setData(res)
        })
    }, ([]))

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ', selectedRows);
            setIds(selectedRowKeys);
        },
    };

    const deleteItem = (id) => {
        console.log(id)
        ProductDeleteApi(id).then((res) => {
            if(res===true) {
                alert('删除成功!')
            }else{
                alert('删除失败!')
            }
        })
    }
    const deleteBatch = () => {
        console.log(ids)
        // TODO: api封装完成接口调用
        // ProductDeleteBatchApi(ids).then((res) => {
        //     if(res===true) {
        //         alert('删除成功!')
        //     }else{
        //         alert('删除失败!')
        //     }
        // })
        axios.delete('http://localhost:8080/product/', {data: ids}).then((res) => {
            console.log(res)
            console.log(res.data)
            if(res.data===true) {
                alert('axios删除成功!')
            }else{
                alert('axios删除失败!')
            }
        })

    }
    return (
        <div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card>
                    <Row >
                        <Col span={18}>
                            <Space size="middle">
                                <Input placeholder="商品名称" />
                                <Input placeholder="商品类别" />
                                <Button type='primary' onClick={deleteBatch}>搜索</Button>
                            </Space>
                        </Col>
                        <Space size="middle">
                            <Button type='primary' onClick={deleteBatch}>新增</Button>
                            <Button type='danger' onClick={deleteBatch}>删除选中</Button>
                        </Space>
                    </Row>
                </Card>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                />
            </Space>
        </div>
    )
}


