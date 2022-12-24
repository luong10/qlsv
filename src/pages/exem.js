import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Form, Input, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const SinglePage = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("student")) || {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [username, setUser] = useState(posts?.username);
  const [firstname, setFirstname] = useState(posts?.firstname);
  const [lastname, setLastname] = useState(posts?.lastname);
  const [email, setEmail] = useState(posts?.email);
  const [phone, setPhone] = useState(posts?.phone);
  const [address, setAddress] = useState(posts?.address);
  const [birthday, setBirthday] = useState(
    moment(posts.birthday).format("YYYY-MM-DD")
  );
  const [gender, setGender] = useState(posts?.gender);

  const id = useLocation().pathname.slice(1);
  // console.log(useLocation());
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    navigate("/");
  };

  const handleOk = async () => {
    try {
      navigate("/");
      await axios.delete(
        `http://prod.example.fafu.com.vn/employee/${posts.id}`
      );
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://prod.example.fafu.com.vn/employee/${posts.id}`, {
        username,
        firstname,
        lastname,
        email,
        phone,
        address,
        birthday,
        gender,
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const res = await axios.get(
          `http://prod.example.fafu.com.vn/employee/${id}`
        );
        setPosts(res.data);
        localStorage.setItem("student", JSON.stringify(res.data));
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }

      // ...
    }
    fetchData();
  }, [posts]);

  // console.log(posts);

  // const timestamp = new Date(posts.birthday);
  // const time =
  //   timestamp.getFullYear() +
  //   "-" +
  //   (timestamp.getMonth() + 1) +
  //   "-" +
  //   timestamp.getDate();

  // console.log(time);

  return (
    <div className="c-single">
      <div className="single">
        <h3 className="titHead">Chỉnh sửa thông tin</h3>
        <label for="uname">Tên đăng nhập (*)</label>
        <input
          type="text"
          id="uname"
          name="username"
          placeholder="..."
          value={username}
          onChange={(e) => setUser(e.target.value)}
        ></input>

        <label for="fname">Họ đệm (*)</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="..."
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        <label for="lname">Tên (*)</label>
        <input
          type="text"
          id="lname"
          name="lastname"
          placeholder="..."
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        ></input>
        <label for="email">Email (*)</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label for="phone">Số điện thoại (*)</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
        <label for="address">Địa chỉ</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <label for="birthday">Ngày sinh (*)</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          placeholder="..."
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        ></input>
        <label>Giới tính (*)</label>

        <Select
          id="gender"
          name="gender"
          value={gender}
          style={{
            width: "auto",
          }}
          options={[
            {
              value: 1,
              label: "Nam",
            },
            {
              value: 0,
              label: "Nu",
            },
          ]}
          onChange={(e) => setGender(e)}
        ></Select>
        <div className="but-1">
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={showModal}>Xóa</Button>
          <Modal
            title="Delete"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Xóa phần tử?</p>
          </Modal>
          <Button onClick={handleClick}>Cập nhật</Button>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
