import React, { useState } from "react";
import "../style.css";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

export const Modall = ({ setIsModalOpen }) => {
  const [username, setUser] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("1");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://prod.example.fafu.com.vn/employee`, {
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
  };
  //console.log(birthday);

  return (
    <div className="container-modal">
      <h3 className="titHead">Tạo mới</h3>

      <label for="uname">Tên đăng nhập (*)</label>
      <input
        type="text"
        id="uname"
        name="username"
        placeholder="..."
        onChange={(e) => setUser(e.target.value)}
      ></input>

      <label for="fname">Họ đệm (*)</label>
      <input
        type="text"
        id="fname"
        name="firstname"
        placeholder="..."
        onChange={(e) => setFirstname(e.target.value)}
      ></input>
      <label for="lname">Tên (*)</label>
      <input
        type="text"
        id="lname"
        name="lastname"
        placeholder="..."
        onChange={(e) => setLastname(e.target.value)}
      ></input>
      <label for="email">Email (*)</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="..."
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label for="phone">Số điện thoại (*)</label>
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="..."
        onChange={(e) => setPhone(e.target.value)}
      ></input>
      <label for="address">Địa chỉ</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="..."
        onChange={(e) => setAddress(e.target.value)}
      ></input>
      <label for="birthday">Ngày sinh (*)</label>
      <input
        type="date"
        id="birthday"
        name="birthday"
        placeholder="..."
        onChange={(e) => setBirthday(e.target.value)}
      ></input>
      <label>Giới tính (*)</label>

      <Select
        id="gender"
        name="gender"
        defaultValue="1"
        style={{
          width: "auto",
        }}
        options={[
          {
            value: "1",
            label: "Nam",
          },
          {
            value: "0",
            label: "Nu",
          },
        ]}
        onChange={(e) => setGender(e)}
      ></Select>

      <div className="but">
        <button
          style={{
            margin: 7,
          }}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Close
        </button>
        <button onClick={handleClick}>Create</button>
      </div>
    </div>
  );
};
