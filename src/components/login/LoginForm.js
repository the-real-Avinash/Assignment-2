import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import '../../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const onFinish =  (values) => {
       const url = 'https://hbauth.herokuapp.com/login';
       axios.post(url, values)
       .then((response) =>{
        // console.log(response.data.token);
        if(response.data.token){
            localStorage.setItem('token', response.data.token);
        }
        navigate('/firstcard');
       }).catch((error)=>{
        setError("Invalid Login");
        console.log(error);
       })

        
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      return (
        <div className="login-container">
        {error && <p className='error-message'>Invalid Login</p>}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input  type='text'
                id='username'
                autoComplete='off'
                required
                value={username}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}

            />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }} />
          </Form.Item>
    
         
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
}

export default LoginForm