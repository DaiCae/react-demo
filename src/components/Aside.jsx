import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import {useNavigate, useLocation} from 'react-router-dom'
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import logoImg from '../assets/logo.svg'

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState('')

    // 一般加个空数组就是为了模仿componentDidMounted
    useEffect(()=>{
        let path = location.pathname;
        // let key = path.split('/')[1];
        let key = path;
        setDefaultKey(key)
    }, [location.pathname])

    const handleClick = e => {
        // navigate('/'+e.key)
        navigate(e.key)
        setDefaultKey(e.key)
    };
    return (
        <>
            {/* <img src={logoImg} alt="" className="logo" /> */}
            <Menu
                onClick={handleClick}
                // style={{ width: 240 ,background: '#f0f1f4'}}
                style={{ width: 240 ,background: '#fff'}}
                selectedKeys={[defaultKey]}
                mode="inline"
                className='aside'
                theme="dark"
            >
                <div className="logo">
                    <a href="/">
                        <h2><img src={logoImg} alt=""/> Ant Design</h2>
                    </a>
                </div>
                <Menu.Item key="/product/list"><DatabaseOutlined /> 商品信息</Menu.Item>
            </Menu>
        </>

    )
}
