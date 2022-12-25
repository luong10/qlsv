import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../style.css";
//import { Modall } from "../component/Modall";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Select,
  Space,
  DatePicker,
  Table,
  Tag,
  Input,
  InputNumber,
} from "antd";

export const Home = () => {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeValue, setChange] = useState();
  const [load, setLoad] = useState(false);

  const [page, setPage] = useState(0);

  const dateFormat = "YYYY/MM/DD";

  async function fetchData(page) {
    setLoad(true);
    // You can await here
    try {
      const res = await axios.get(
        `http://prod.example.fafu.com.vn/employee?page=${page}&size=6`
      );
      setPosts(res.data);
      setPage(res.data.total_count);
      setLoad(false);
      // console.log(page);
    } catch (error) {
      console.log(error);
    }

    // ...
  }
  useEffect(() => {
    fetchData(0);
  }, [isModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);

    setChange({
      ...changeValue,
      [name]: value,
    });
    console.log(changeValue);
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://prod.example.fafu.com.vn/employee`, changeValue);
    } catch (err) {
      console.log(err);
    }
    handleCancel();
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const dataSource = [];

  posts &&
    posts.data.map((post) =>
      dataSource.push({
        key: post.id,
        username: post.username,
        fullname: `${post.firstname} ${post.lastname}`,
        email: post.email,
        phone: post.phone,
      })
    );

  //console.log(posts);
  return (
    <div className="container-home">
      <div className="div-content">
        <h2
          style={{
            color: "gray",
          }}
        >
          Student Manage
        </h2>
        <Button onClick={() => setIsModalOpen(true)}>Insert</Button>
      </div>

      <div className="div-table">
        <Table
          // onRow={() => alert("hihihi")}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // console.log(record.key);

                navigate(`/${record.key}`);
              }, // click row
            };
          }}
          className="table"
          dataSource={dataSource}
          columns={columns}
          defaultCurrent={6}
          loading={load}
          pagination={{
            pageSize: 6,
            total: page,
            onChange: (page) => {
              // if (page == 1) fetchData(0);
              // else fetchData(page - 1);
              fetchData(page - 1);
            },
          }}
        />
        {/* <table>
          <thead>
            <tr id="head-color">
              <th>Ten dang nhap</th>
              <th>Ho ten</th>
              <th>Email</th>
              <th>Dien Thoai</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.data.map((post) => (
                <tr key={post.id}>
                  <Link className="link" to={`/${post.id}`}>
                    <td>{post.username}</td>
                  </Link>
                  <td>{`${post.firstname} ${post.lastname}`}</td>
                  <td>{post.email}</td>
                  <td>{post.phone}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
      </div>
      <div>
        <Modal
          open={isModalOpen}
          title="Insert"
          destroyOnClose={true}
          onCancel={handleCancel}
          centered
          footer={[
            <Button onClick={handleCancel}> Close</Button>,
            <Button type="primary" onClick={handleInsert}>
              {" "}
              Insert
            </Button>,
          ]}
        >
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
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
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
              <Input name="username" onChange={handleChange} />
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
              <Input name="firstname" onChange={handleChange} />
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
              <Input name="lastname" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input name="email" onChange={handleChange} />
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
                name="phone"
                onChange={handleChange}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input name="address" onChange={handleChange} />
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
                name="birthday"
                format={dateFormat}
                onChange={(date) => {
                  setChange({
                    ...changeValue,
                    birthday: date,
                  });
                  // console.log(dateString);

                  console.log(changeValue);
                }}
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
                  message: "Please input your gender!",
                },
              ]}
            >
              <Select
                id="gender"
                name="gender"
                onChange={(e) => {
                  setChange({
                    ...changeValue,
                    gender: e,
                  });
                  console.log(changeValue);
                }}
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
          </Form>
        </Modal>
        {/* {isModalOpen && (
          <div className="modalBackground">
            <Modall setIsModalOpen={setIsModalOpen} />
          </div>
        )} */}
      </div>
    </div>
  );
};
