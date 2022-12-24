import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Form, Input, DatePicker, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const SinglePage = () => {
  const [posts, setPosts] = useState();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const id = useLocation().pathname.slice(1);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const res = await axios.get(
          `http://prod.example.fafu.com.vn/employee/${id}`
        );
        setPosts(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }

      // ...
    }
    fetchData();
  }, [setPosts]);

  // const dataSource = [];
  // posts &&
  // posts.data.map((post) =>
  //   dataSource.push({
  //     key: post.id,
  //     username: post.username,
  //     fullname: `${post.firstname} ${post.lastname}`,
  //     email: post.email,
  //     phone: post.phone,
  //   })
  // );

  //

  console.log(typeof posts);

  return (
    <div className="c-single">
      <div className="single">
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
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please input your birthday!",
              },
            ]}
          >
            <DatePicker
              style={{
                height: 25,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input your birthday!",
              },
            ]}
          >
            <Select
              id="gender"
              name="gender"
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
              <Button type="primary" htmlType="button">
                Close
              </Button>
              <Button className="but-2" type="primary" htmlType="button">
                Delete
              </Button>
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
