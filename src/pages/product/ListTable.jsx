/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Table, Button, Input, Row, Col, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { ProductFindApi, ProductDeleteApi, ProductDeleteBatchApi, ProductTotalApi, CategoryFindApi} from '../../request/api';

export default function ListTable() {
    const navigate = useNavigate()

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            render: (text, record) => <a href={'/product/detail/' + record.id} >{text}</a>,
        },
        {
            title: '分类',
            dataIndex: 'categoryId',
            render(categoryId){
                return categoryConfig[categoryId]
            }
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
    // const [categoryConfig,setCategoryConfig] = useState()
    let categoryConfig = Object;
    const [data, setData] = useState()
    const [ids, setIds] = useState()
    
    // 搜索的关键字
    const [keywords, setKeywords] = useState({
        name: null,
        categoryName: null,
    })

    // 分页参数 (点击搜索按钮后会将 关键字更新到自身)
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 10,
        name: null,
        categoryName: null,
    })

    useEffect(() => {
        updateTotal()
        loadData(pagination)
        getCategory()
    }, [])

    //批量删除的行id集合
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`,'selectedRows: ', selectedRows);
            console.log(pagination);
            setIds(selectedRowKeys);
        },
    };

    // 从后端获取分类信息
    const getCategory =() =>{
        CategoryFindApi().then(res => {
            console.log(res)
            for(let i=0;i<res.length;i++){
                categoryConfig[res[i].id] = res[i].name;
            }
        })
    }

    // 激活搜索的关键词 并刷新数据
    const activeSearchKeywords = () => {
        console.log(pagination);
        console.log(keywords);
        Object.assign(pagination, keywords);
        setPagination(pagination)
        console.log(pagination);
        updateTotal();
        loadData(pagination)
    }

    // 处理表格换页
    const handleTableChange = (pagination) => {
        loadData(pagination)
        setPagination(pagination)
        console.log(pagination)
    };

    // 更新表格数据总数
    const updateTotal = () => {
        setData();
        pagination.current=1
        ProductTotalApi(pagination).then(res=>{
            console.log(res)
            pagination.total=res
        })
        setPagination(pagination)
    }

    // 从后端加载数据
    const loadData = (pagination) => {
        ProductFindApi(pagination).then(res => {
            console.log(pagination)
            res.map(x => x.key = x.id)
            setData(res)
        })
    }

    // 判断操作是否成功 true ? false
    const parseResStatus = (status) => {
        if (status === true) {
            alert('操作成功!')
            loadData()
        } else {
            alert('操作失败!')
        }
    }

    // 单条删除
    const deleteItem = (id) => {
        console.log(id)
        ProductDeleteApi(id).then((res) => {
            parseResStatus(res)
        })
    }

    // 批量删除
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
                            {/* <Input placeholder="商品名称" onChange={(event) => setSearchName(event.target.value)} />
                        <Input placeholder="商品类别" onChange={(event) => setSearchCategory(event.target.value)} /> */}
                            <Input placeholder="商品名称" onChange={(event) => keywords.name = event.target.value} />
                            <Input placeholder="商品类别" onChange={(event) => keywords.categoryName = event.target.value} />
                            <Button type='primary' onClick={() => activeSearchKeywords()}>搜索</Button>
                        </Space>
                    </Col>
                    <Space size="middle">
                        <Button type='primary' onClick={() => navigate('/product/edit/')}>新增数据</Button>
                        <Button type='primary' onClick={() => loadData(pagination)}>刷新数据</Button>
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
                    rowSelection={rowSelection}
                />
            </Card>
        </Space>
    )
}
