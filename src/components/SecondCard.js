import {
  EditOutlined,
  HeartOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { React, useState } from "react";
import { Row,Col } from "antd";
import { Modal, Form, Input } from "antd";
import "../App.css";
import { useNavigate } from "react-router-dom";



const SecondCard = ({ users, setUsers,loading }) => {
  //States
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setIsEditingUser] = useState(null);
  const navigate = useNavigate();

  //Delete Functionality
  const DeleteUser = (index) => {
    setUsers((user) => {
      return user.filter((ele) => ele.id !== index);
    });
  };

  //Toggle Heart Functionality
  const toggleHeart = (e) => {
    const target = e.currentTarget;
    if (target) {
      target.classList.toggle("isHeartActive");
    }
  };

  //Edit User Functionality
  const editDetails = (id) => {
    console.log("Hello");
    let userData = users.filter((user) => {
      if (user.id === id) {
        return user;
      }
      return false;
    });
    console.log("Selected User", userData[0]);
    setIsEditing(true);
    setIsEditingUser(userData[0]);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setIsEditingUser(null);
  };

  return (
    <>
    <div className="outer-container">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {/* Modal Code  */}
        <Modal
          title="Basic Modal"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setUsers((pre) => {
              return pre.map((curElem) => {
                if (curElem.id === editingUser.id) {
                  return editingUser;
                } else {
                  return curElem;
                }
              });
            });
            resetEditing();
          }}
        >
          {/* Form code  */}

          <Form>
            <Form.Item
              label="Name"
              rules={[
                { required: true, message: "Please Enter Your Name!" },
                { whitespace: true },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input
                value={editingUser?.name}
                onChange={(e) => {
                  setIsEditingUser((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                value={editingUser?.email}
                onChange={(e) => {
                  setIsEditingUser((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Phone">
              <Input
                value={editingUser?.phone}
                onChange={(e) => {
                  setIsEditingUser((pre) => {
                    return { ...pre, phone: e.target.value };
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Website">
              <Input
                value={editingUser?.website}
                onChange={(e) => {
                  setIsEditingUser((pre) => {
                    return { ...pre, website: e.target.value };
                  });
                }}
              />
            </Form.Item>
          </Form>
          {/* End of Form COde  */}
        </Modal>

        {/* Logout button */}
        {!loading && (
        <Col span={10} offset={22}>
          <Button className="btn-primary"
          type="primary" onClick={()=>{
            localStorage.removeItem('token');
            navigate('/');
          }}>
          Logout
          </Button>
          </Col>
        )
        }
        {/* End of Modal Code  */}
        
        {/* End of Modal COde  */}
        {users.map((user) => {
          return (
            <div className="container">
              <Card
                className="style"
                cover={
                  <img
                    alt="example"
                    src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                  />
                }
                actions={[
                  <HeartOutlined key="setting" onClick={toggleHeart} />,
                  <EditOutlined
                    key="setting"
                    onClick={() => editDetails(user.id)}
                  />,
                  <DeleteOutlined
                    key="setting"
                    onClick={() => DeleteUser(user.id)}
                  />,
                ]}
              >
                <h3>{user.name}</h3>
                <p>
                  <MailOutlined /> {user.email}
                </p>
                <p>
                  <PhoneOutlined /> {user.phone}
                </p>
                <p>
                  <GlobalOutlined /> {user.website}
                </p>
              </Card>
            </div>
          );
        })}
      </Row>
      </div>
    </>
  );
};

export default SecondCard;
