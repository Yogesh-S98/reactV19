import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { Protect, UnProtect } from './Protect';
import FullScreenLoader from './loaderSpin';
import { LoadingProvider } from './loader';
import { NotificationProvider } from './notification';
import MenuBar from './menu';
import { Layout } from 'antd';
import Profile from './profile';
import SideBar from './sider';
import DataProvider from './DataProvider';
import CrudProvider from './userContext';
import Login from './Login';
import UsersList from './crud';

const { Content } = Layout;

function App() {
  const token = Boolean(localStorage.getItem('token'));

  return (
    <div className='App'>
      <Layout style={{ background: 'white' }}>
        { token && <MenuBar/> }
        <Layout style={{ background: 'white' }}>
        { token && <SideBar/> }
          <Layout style={{ background: 'white' }}>
            <Content>
              <LoadingProvider>
                <NotificationProvider>
                  {/* <DataProvider> */}
                    <CrudProvider>
                        <FullScreenLoader/>
                            <Routes>
                              <Route path='/' element={
                                <UnProtect>
                                  <Login></Login>
                                </UnProtect>
                                }>
                              </Route>
                              <Route path='/home' element={
                                <Protect>
                                  <NewHome></NewHome>
                                </Protect>
                                }>
                              </Route>
                              <Route path='/users' element={
                                <Protect>
                                  <UsersList></UsersList>
                                </Protect>
                                }>
                              </Route>
                              <Route path='/profile' element={
                                <Protect>
                                  <Profile></Profile>
                                </Protect>
                                }>
                              </Route>
                            </Routes>
                    </CrudProvider>
                  {/* </DataProvider> */}
                </NotificationProvider>
              </LoadingProvider>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}


export const NewHome = () => {
  return (
    <div className='main-container App-header'>
      Welcome to Myapp
    </div>
  )
}

export default App;
