import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Aside from './components/Aside'
import Bread from './components/Bread'

export default function app() {
    return (
        <Layout id='app'>
            <div className='container'>
                <Aside />
                <div className='container_box'>
                    <Bread />
                    <div >
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer>Respect | Copyright &copy; 2022 </footer>
        </Layout>
    )
}

