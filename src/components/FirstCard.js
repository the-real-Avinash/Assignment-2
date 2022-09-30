import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
// import { Button } from 'antd';
// import { Card } from "antd";
import SecondCard from "./SecondCard";
import Loading from "./Loading";

const FirstCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    // console.log("Hello");
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    // console.log(data);
    setLoading(false)
    setUsers(data);
    
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() =>{
      fetchData();
    },3000);
    
  }, []);
  return (
    <>
    {loading && <Loading/>}

      <SecondCard users={users} setUsers={setUsers} loading={loading} />

      
    
    </>
  
  );
};

export default FirstCard;
