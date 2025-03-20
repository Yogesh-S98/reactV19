import React, { useContext, useState } from "react";
import { Button, Input, Table, Modal, Form, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DataContext from "./Datacontext";

const ReadContext = () => {
    const { items, addItem, updateItem, deleteItem } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [form] = Form.useForm();

    // Open modal for add/update
    const showModal = (item = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
        form.setFieldsValue({ name: item?.name || "" });
    };

    // Handle form submission
    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (currentItem) {
                updateItem(currentItem.id, values);
            } else {
                addItem(values);
            }
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    // Define columns for Ant Design Table
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record)}>
                        Edit
                    </Button>
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteItem(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>CRUD with Context API & Ant Design</h2>

            {/* Add New Item Button */}
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                Add Item
            </Button>

            {/* Table */}
            <Table 
                dataSource={items} 
                columns={columns} 
                rowKey="id" 
                style={{ marginTop: 20 }}
            />

            {/* Modal for Add/Edit */}
            <Modal
                title={currentItem ? "Edit Item" : "Add Item"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Item Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter a name!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ReadContext;
