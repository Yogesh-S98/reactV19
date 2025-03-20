import React from "react";
import { Avatar, Dropdown, Layout, Menu, Space } from "antd";
import { BrowserRouter as Router, Link, useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;

const MenuBar = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const menuItems = [
      // { key: "/home", label: <Link to="/home">Home</Link> },
      // { key: "/users", label: <Link to="/users">Users</Link> }
  ];

  const items = [
    { key: "profile", label: "Profile" },
    { key: "logout", label: "Logout" },
  ];

  const handleMenu = (val) => {
    
    switch (val.key) {
      case 'logout':
        logout();
        return;
      case 'profile':
        navigate('/profile');
        return;
    }
  };

  return (
    <Header style={{ display: 'flex'}}>
      <div className="logo" style={{ color: "white", fontSize: 20, fontWeight: "bold", marginRight: "20px" }}>
        MyApp
      </div>
      <Menu 
        theme="dark" 
        style={{ flexGrow: 1 }} 
        mode="horizontal" 
        selectedKeys={[location.pathname]}
        items={menuItems} />
      <div>
      <Dropdown menu={{ items, onClick: handleMenu }} trigger={'click'}>
        <div className="d-flex p-3" style={{ paddingBottom: '0px !important' }}>
          <div style={{ 
              color: 'white', 
              fontSize: '20px', 
              fontWeight: 'bold', 
              lineHeight: '35px',
              paddingRight: '10px' }}>
            {userDetails.first_name}
          </div>
          <Avatar
            style={{
              backgroundColor: "#f8f9fa",
              color: "black",
              cursor: "pointer"
            }}
            size="large"
          >
            {userDetails.first_name.charAt(0).toUpperCase()}
          </Avatar>
        </div>
    </Dropdown>
      </div>
    </Header>
  );
};

export default MenuBar;
