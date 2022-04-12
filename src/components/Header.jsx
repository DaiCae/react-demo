import React, { useEffect, useState } from 'react'
import { Breadcrumb, Menu, Dropdown, message, Row, Col } from 'antd';
import { HomeOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import defaultAvatar from '../assets/defaultAvatar.jpg'

export default function Header(props) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [breadName, setBreadName] = useState('')
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState("游客")

    // 模拟componentDidMount
    useEffect(() => {
        switch (pathname) {
            case "/product/list":
                setBreadName('商品信息查看');
                break;
            default:
                setBreadName(pathname.includes('/product/edit') ? '商品信息编辑' : "");
                break;
        }

        let username_store = localStorage.getItem('name')
        let avatar_store = localStorage.getItem('avatar')
        if (username_store) {
            setUsername(username_store)
        }
        if (avatar_store) {
            setAvatar(avatar_store)
        }
    }, [props.mykey])

    // 退出登录
    const logout = () => {
        message.success('退出成功，即将返回登录页')
        localStorage.clear();   // 清除localStorage中的数据
        setTimeout(() => navigate('/login'), 1500)
    }

    const menu = (
        <Menu>
            <Menu.Item key={1}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <header>
            <Row gutter={16} className="header-row">
                <Col className="gutter-row" span={20}>
                    <Breadcrumb style={{ height: '60px', lineHeight: '40px' }}>
                        <Breadcrumb.Item href='/'>
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col className="gutter-row" span={4}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src={avatar} className="avatar" alt="" />
                            <span> {username}</span>
                            <CaretDownOutlined />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
        </header>
    )
}

