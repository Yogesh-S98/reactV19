import { Avatar, Button, Card, Col, ColorPicker, Divider } from "antd";
import { useEffect, useState } from "react";


function Profile() {
    const [basic, setBasic] = useState('');
    const [theme, setTheme] = useState('');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const changeColor = () => {
        const colors = JSON.parse(localStorage.getItem('colors'));
        if (colors) {
            document.documentElement.style.setProperty('--app-bg-color', colors.basic);
            document.documentElement.style.setProperty('--app-text-color', colors.theme);
        }
    }

    useEffect(() => {
        changeColor();
    }, []);
    
    const submit = () => {
        const colors = {
            basic,
            theme
        }
        localStorage.setItem('colors', JSON.stringify(colors));
        changeColor();
    }
    return (
        <div className="main-container">
            <div className="p-2">
                <Card style={{ textAlign: 'start', width: '50%' }}>
                    <Divider plain>
                        <div style={{color: '#5f5f5f', fontWeight: 'bold'}}>
                            User Details
                        </div>
                    </Divider>
                    <div className="d-flex">
                        <Avatar size={50}>{userDetails.first_name.charAt(0).toUpperCase()}</Avatar>
                        <Col className="p-3 text-bold">
                            {userDetails.first_name} {userDetails.last_name}
                        </Col>
                    </div>
                    <Col>
                        <label>First Name:</label> {userDetails.first_name}
                    </Col>
                    <Col>
                        <label>Last Name:</label> {userDetails.last_name}
                    </Col>
                    <Col>
                        <label>Email:</label> {userDetails.email}
                    </Col>
                    <Col>
                        <label>Basic color: </label>
                        <ColorPicker className="p-1 m-2" showText value={basic} onChange={(e) => setBasic(e.toHexString())}></ColorPicker>
                    </Col>
                    <Col>
                        <label>Theme color: </label>
                        <ColorPicker className="p-1 m-2" showText value={theme} onChange={(e) => setTheme(e.toHexString())}></ColorPicker>
                    </Col>
                    <div className="d-flex justify-content-end">
                        <Button onClick={submit} type="primary">Save</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Profile;