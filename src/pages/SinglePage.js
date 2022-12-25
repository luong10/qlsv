import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Skeleton,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const SinglePage = () => {
  const [posts, setPosts] = useState({});
  const [changeValue, setChange] = useState();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateFormat = "YYYY/MM/DD";
  const [loading, setLoading] = useState(false);
  const id = useLocation().pathname.slice(1);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("chackValue:", values);
    try {
      await axios.put(`http://prod.example.fafu.com.vn/employee/${id}`, {
        ...values,
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      navigate("/");
      await axios.delete(`http://prod.example.fafu.com.vn/employee/${id}`);
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // You can await here
      try {
        const res = await axios.get(
          `http://prod.example.fafu.com.vn/employee/${id}`
        );
        if (res?.data) setPosts(res?.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      // ...
    }
    fetchData();
  }, []);

  const handleClose = () => {
    navigate("/");
  };
  if (loading) return <Skeleton active />;
  return (
    <div className="c-single">
      <div className="single">
        <Form
          form={form}
          name="control-hooks"
          initialValues={posts}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            // format={dateFormat}
            rules={[
              {
                required: true,
                message: "Please input your birthday!",
              },
            ]}
          >
            {/* <Input /> */}

            <Space direction="vertical" size={12}>
              <DatePicker
                name="birthday"
                defaultValue={moment.unix(posts?.birthday / 1000, dateFormat)}
                format={dateFormat}
                style={{
                  height: 25,
                }}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input your gender!",
              },
            ]}
          >
            <Select
              id="gender"
              name="gender"
              defaultValue={posts && posts.gender}
              style={{
                height: 25,
              }}
              options={[
                {
                  value: 1,
                  label: "Male",
                },
                {
                  value: 0,
                  label: "Female",
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div className="but-1">
              <Button type="primary" htmlType="button" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="but-2"
                type="primary"
                htmlType="button"
                onClick={showModal}
              >
                Delete
              </Button>
              <Modal
                title="Delete"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Xóa phần tử?</p>
              </Modal>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SinglePage;
