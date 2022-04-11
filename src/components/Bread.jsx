import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom'

export default function Bread() {
    const { pathname } = useLocation()
    const [breadName, setBreadName] = useState('')

    // 不是在组件mounted时去获取路径，而是路径一旦变化，就要获取对应的路径名称，并且修改breadName
    // 监听路由的路径(/list /edit /means)
    useEffect(() => {
        switch (pathname) {
            case "/product/list":
                setBreadName('商品信息查看');
                break;
            default:
                setBreadName(pathname.includes('/product/edit') ? '商品信息编辑' : "");
                break;
        }
    }, [pathname])

    return (
        <Breadcrumb style={{height: '36px', lineHeight: '24px'}}>
            <Breadcrumb.Item href='/'>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

