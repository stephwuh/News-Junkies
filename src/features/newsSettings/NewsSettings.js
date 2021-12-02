import React, { useEffect, useState } from "react";
import axios from "axios";

import NewsList from "./NewsList";

const NewsSettings = () => {


  const [leftState, setLeftState] = useState([]);
  const [leftCenterState, setLeftCenterState] = useState([]);
  const [centerState, setCenterState] = useState([]);
  const [rightCenterState, setRightCenterState] = useState([]);
  const [rightState, setRightState] = useState([]);

  useEffect(() => {
    const getSources = async () => {
      const response = await axios.get("http://localhost:5050/api/getSources");

      for (let type in response.data) {
        if (type === "left") {
          setLeftState(response.data[type]);
        } else if (type === "leftCenter") {
          setLeftCenterState(response.data[type]);
        } else if (type === "center") {
          setCenterState(response.data[type]);
        } else if (type === "rightCenter") {
          setRightCenterState(response.data[type]);
        } else if (type === "right") {
          setRightState(response.data[type]);
        }
      }

    };

    getSources();
  }, []);

  return (
    <div>
      <form>
        <NewsList type="left" list={leftState}/>
        <NewsList type="left-center" list={leftCenterState}/>
        <NewsList type="center" list={centerState}/>
        <NewsList type="right-center" list={rightCenterState}/>
        <NewsList type="right" list={rightState}/>
      </form>
    </div>
  );
};

export default NewsSettings;
