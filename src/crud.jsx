import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "./table";
import { Button, Modal, Form, Row, Col, Input } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataContext } from "./userContext";
// import { Col, Form } from "react-bootstrap";


function UsersList() {
    const userObj = {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        isAdmin: false
    };
    const { items, metaData, addItem, updateItem, deleteItem, actionFromTable } = useContext(DataContext);
    const [form] = Form.useForm();
    const [isEdited, setIsEdited] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const [userModel, setUserModel] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [userForm, setUserForm] = useState(userObj);
    // const [errors, setErrors] = useState(userObj);
    const [title, setTitle] = useState('');

    const confirm = (row) => {
        modal.confirm({
            title: 'Are you sure delete this user?',
            icon: <DeleteOutlined style={{ color: 'red' }}/>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            centered: true,
            okButtonProps: { loading: loading },
            onOk() {
                setLoading(true);
                const result = deleteItem(row.id);
                if (result) {
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            },
            onCancel() {
                return true;
            }
        });
    };

    // Use useEffect to call loadList when the component mounts
    useEffect(() => {
        form.setFieldsValue();
        // loadList();
    }, []);
    
    
    const columns = [
        { title: "First Name", dataIndex: "firstName", key: 'firstName' },
        { title: "Last Name", dataIndex: 'lastName', key: 'lastName' },
        { title: "Email", dataIndex: "email", key: 'email' },
        { title: 'Phone Number', dataIndex: "phoneNumber", key: 'phoneNumber' },
        {
            title: "Actions",
            key: 'action',
            render: (row) => (
              <div className="text-left">
                <Button
                    variant="solid"
                    color="primary"
                    shape="circle"
                    onClick={() => handleEdit(row)}
                >
                  <EditOutlined />
                </Button>
                <Button
                    variant="solid"
                    color="danger"
                    shape="circle"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleDelete(row)}>
                  <DeleteOutlined />
                </Button>
              </div>
            )
          }
    ];

    const handleEdit = async (row) => {
        console.log('row', row);
        setUserModel(true);
        setIsEdited(false);
        setTitle('Update User');
        // await form.setFieldsValue(userObj);
        form.setFieldsValue(userObj);
        form.setFieldsValue(row);
        console.log('ddd', form.getFieldsValue(true));
        // setErrors(userObj);
    };
    
    const handleDelete = async (row) => {
        console.log('row', row);
        confirm(row);
    };

    const addUser = () => {
        setTitle('Create User');
        setIsEdited(true);
        form.resetFields();
        // setErrors(userObj);
        // setUserForm(userObj);
        setUserModel(true);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const values = await form.validateFields();
            console.log('valid', values);
            console.log('dddd', form.getFieldsValue(true))
            setLoading(true);
            if (form.getFieldsValue(true).id) {
                const value = await updateItem(form.getFieldsValue(true));
                if (value) {
                    setUserModel(false);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } else {
                const value = await addItem(form.getFieldsValue(true));
                console.log('value', value);
                if (value) {
                    setUserModel(false);
                    setLoading(false);
                    // setErrors(userObj);
                } else {
                    setLoading(false);
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div className="p-5 main-container">
            <>
                <div className="p-2 d-flex justify-content-between">
                    <div>
                        <h3>Users</h3>
                    </div>
                    <Button variant="solid" color="primary" onClick={addUser}>Create User</Button>
                </div>
                <Table
                    pagination={metaData}
                    handleTable={actionFromTable}
                    columns={columns}
                    data={items}>
                </Table>
            </>
            <Modal
                title={title}
                open={userModel}
                onCancel={() => setUserModel(false)}
                centered
                footer={null}
                >
                <div>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={userObj}
                        onValuesChange={() => setIsEdited(true)}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    rules={[{
                                        required: true,
                                        message: 'First name is required'
                                    }]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[{
                                        required: true,
                                        message: 'Last name is required'
                                    }]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{
                                        required: true,
                                        message: 'Email is required'
                                    }]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    label="Phone number"
                                    name="phoneNumber"
                                    rules={[{
                                        required: true,
                                        message: 'Phone number is required'
                                    }]}>
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="d-flex justify-content-end">
                    <Button color="danger" variant="solid" style={{ marginRight: '10px' }} onClick={() => setUserModel(false)}>Cancel</Button>
                    <Button color="primary" disabled={!isEdited} loading={loading} variant="solid" onClick={submitForm} type="submit">
                        {form.getFieldsValue(true).id ? 'Update' : 'Submit'}
                    </Button>
                </div>
            </Modal>
            {contextHolder}
        </div>
    )
}

export default UsersList;