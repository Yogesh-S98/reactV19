import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
    const location = useLocation();
    const menuItems = [
        { key: "/home", label: <Link to="/home">Home</Link> },
        { key: "/users", label: <Link to="/users">Users</Link> }
    ];
      
    return (
        <Sider width={200} style={{ borderRight: '1px solid #dedede' }}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{ height: '100%', borderRight: 1 }}
              items={menuItems}
            />
        </Sider>
    )
}

export default SideBar;