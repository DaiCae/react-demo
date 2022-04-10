/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import { Table, Button, Space, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { ProductFindApi } from '../request/api';


export default function List() {
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item name={dataIndex} style={{margin: 0,}}
                        rules={[{required: true,message: `Please Input ${title}!`,},]}>
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    
    const EditableTable = () => {
        const [form] = Form.useForm();
        const [data, setData] = useState()
        useEffect(()=>{
            ProductFindApi().then(res =>{
                res.map(x => x.key = x.id)
                console.log(res)
                setData(res)
            })
        },([]))
        const [editingKey, setEditingKey] = useState('');
    
        const isEditing = (record) => record.key === editingKey;
    
        const edit = (record) => {
            form.setFieldsValue({
                name: '',
                categoryId: '',
                ...record,
            });
            setEditingKey(record.key);
        };
    
        const cancel = () => {
            setEditingKey('');
        };
    
        const save = async (key) => {
            try {
                const row = await form.validateFields();
                const newData = [...data];
                const index = newData.findIndex((item) => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }
            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };
    
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
                title: 'operation',
                dataIndex: 'operation',
                render: (_, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <Space size="middle">
                            <Button onClick={() => save(record.key)}>保存</Button>
                            <Button onClick={cancel}>取消</Button>
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Button type='primary' onClick={() => edit(record)}>修改</Button>
                            <Button type='danger' >删除</Button>
                        </Space>
                    );
                },
            },
        ];

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {return col;}
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });

        return (
            <Form form={form} component={false}>
                <Table
                    components={{body: {cell: EditableCell,},}}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{onChange: cancel,}}/>
            </Form>
        );
    };

    return (
        <div>
            <EditableTable></EditableTable>
        </div>
    )
}

