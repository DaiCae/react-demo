/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Table, Button, Input, Row, Col, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { ProductFindApi, ProductDeleteApi, ProductDeleteBatchApi, ProductTotalApi} from '../../request/api';

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
                    <Button type='primary' onClick={() => navigate('/product/edit/' + record.id)}>编辑</Button>
                    <Button type='danger' onClick={() => deleteItem(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];
    const [data, setData] = useState()
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 10,
    })
    const [ids, setIds] = useState()
    const [searchName, setSearchName] = useState()
    const [searchCategory, setSearchCategory] = useState()


    useEffect(() => {
        ProductTotalApi().then(res=>{
            pagination.total=res
            setPagination(pagination)
        })
        loadData(pagination)
    }, [pagination])

    const handleTableChange = (pagination) => {
        loadData()
        setPagination(pagination)
        console.log(pagination)
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`,'selectedRows: ', selectedRows);
            console.log(pagination);
            setIds(selectedRowKeys);
        },
    };

    const loadData = (pagination) => {
        ProductFindApi(pagination).then(res => {
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
    const parseResStatus = (status) => {
        if (status === true) {
            alert('操作成功!')
            loadData()
        } else {
            alert('操作失败!')
        }
    }
    const deleteItem = (id) => {
        console.log(id)
        ProductDeleteApi(id).then((res) => {
            parseResStatus(res)
        })
    }

    const deleteBatch = () => {
        console.log(ids)
        ProductDeleteBatchApi(ids).then((res) => {
            parseResStatus(res)
        })
    }

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card>
                <Row >
                    <Col span={14}>
                        <Space size="middle">
                            <Input placeholder="商品名称" onChange={(event) => setSearchName(event.target.value)} />
                            <Input placeholder="商品类别" onChange={(event) => setSearchCategory(event.target.value)} />
                            <Button type='primary' onClick={() => searchData({ "name": searchName, "categoryName": searchCategory })}>搜索</Button>
                        </Space>
                    </Col>
                    <Space size="middle">
                        <Button type='primary' onClick={() => navigate('/product/edit/')}>新增数据</Button>
                        <Button type='primary' onClick={loadData}>刷新数据</Button>
                        <Button type='danger' onClick={deleteBatch}>删除选中</Button>
                    </Space>
                </Row>
            </Card>
            <Card>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={pagination}
                    onChange={handleTableChange}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                />
            </Card>
        </Space>
    )
}
