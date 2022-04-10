import React from 'react'
import { Button } from 'antd';
import { Outlet } from 'react-router-dom';

export default function app() {
    return (
        <div className="App">
            <Button type="primary">Button</Button>
            <Outlet/>
        </div>
    )
}
