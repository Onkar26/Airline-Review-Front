import { React, useState, useEffect } from "react";
import Cardlist from "./Cardlist";
import Loading from "./Loading";
const { default: axios } = require("axios");

const Home = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAirlines = async () => {
    const response = await axios.get("http://localhost:3000/airlines");
    // console.log(response.data);
    setList(response.data);
    if (response.data) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAirlines();
  }, []);
  return (
    <>
      <div className="header">
        <h1 style={{ margin: "0.5rem" }}> Fight Review</h1>
        <p>Unbiased and Honest airlines reviews. Share your experience</p>
      </div>
      {isLoading ? <Loading /> : <Cardlist list={list} />}
    </>
  );
};

export default Home;
