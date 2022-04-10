/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Table, Button, Input, Row, Col, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { ProductFindApi, ProductDeleteApi, ProductDeleteBatchApi } from '../request/api';

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
    const [searchName,setSearchName] = useState()
    const [searchCategory,setSearchCategory] = useState()

    useEffect(() => {
        loadData()
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ', selectedRows);
            setIds(selectedRowKeys);
        },
    };


    const loadData = () => {
        ProductFindApi().then(res => {
            res.map(x => x.key = x.id)
            console.log(res)
            setData(res)
        })
    }

    const searchData = (params) => {
        console.log(params)
        ProductFindApi(params).then(res => {
            res.map(x => x.key = x.id)
            console.log(res)
            setData(res)
        })
    }

    const deleteItem = (id) => {
        console.log(id)
        ProductDeleteApi(id).then((res) => {
            if(res===true) {
                alert('删除成功!')
                loadData()
            }else{
                alert('删除失败!')
            }
        })
    }

    const deleteBatch = () => {
        console.log(ids)
        ProductDeleteBatchApi(ids).then((res) => {
            if(res===true) {
                alert('删除成功!')
                loadData()
            }else{
                alert('删除失败!')
            }
        })

    }

    return (
        <div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card>
                    <Row >
                        <Col span={16}>
                            <Space size="middle">
                                <Input placeholder="商品名称" onChange={(event) =>setSearchName(event.target.value)}/>
                                <Input placeholder="商品类别" onChange={(event) =>setSearchCategory(event.target.value)}/>
                                <Button type='primary' onClick={()=>searchData({"name":searchName,"categoryName":searchCategory})}>搜索</Button>
                            </Space>
                        </Col>
                        <Space size="middle">
                            <Button type='primary' onClick={() => navigate('/edit/')}>新增数据</Button>
                            <Button type='primary' onClick={loadData}>刷新数据</Button>
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



