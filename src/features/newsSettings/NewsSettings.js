import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../.././App.css";

import NewsList from "./NewsList";

const NewsSettings = () => {
  const [sourceState, setSourceState] = useState([]);

  const [leftState, setLeftState] = useState([]);
  const [leftCenterState, setLeftCenterState] = useState([]);
  const [centerState, setCenterState] = useState([]);
  const [rightCenterState, setRightCenterState] = useState([]);
  const [rightState, setRightState] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getSources = async () => {

      const response = await axios.get("http://localhost:5050/api/getSources");

      setSourceState(response.data);
    };

    getSources();
  }, []);

  const handleSubmitButtonOnClick = async (e) => {
    e.preventDefault();

    const userSource = [
      ...leftState,
      ...leftCenterState,
      ...centerState,
      ...rightCenterState,
      ...rightState,
    ];


    try {
      //check for server error/success message

      axios.post("http://localhost:5050/api/postUserSource", userSource)

      alert("Updated Successfully!");

      navigate('/my-news');

      //clear check marks 

    } catch (error) {
      alert("Something went wrong :( ");
    }

    

  };

  const handleLeftOnChange = (e) => {
    if (e.target.checked) {
      
      setLeftState([...leftState, {newsId: +e.target.value}]);
    } else {
      setLeftState(leftState.filter((source) => source !== e.target.value));
    }
  };

  const handleLeftCenterOnChange = (e) => {
    if (e.target.checked) {
      setLeftCenterState([...leftCenterState, {newsId: +e.target.value}]);
    } else {
      setLeftCenterState(
        leftCenterState.filter((source) => source !== e.target.value)
      );
    }
  };

  const handleCenterOnChange = (e) => {
    if (e.target.checked) {
      setCenterState([...centerState, {newsId: +e.target.value}]);
    } else {
      setCenterState(centerState.filter((source) => source !== e.target.value));
    }
  };

  const handleRightCenterOnChange = (e) => {
    if (e.target.checked) {
      setRightCenterState([...rightCenterState, {newsId: +e.target.value}]);
    } else {
      setRightCenterState(
        rightCenterState.filter((source) => source !== e.target.value)
      );
    }
  };

  const handleRightOnChange = (e) => {
    if (e.target.checked) {
      setRightState([...rightState, {newsId: +e.target.value}]);
    } else {
      setRightState(rightState.filter((source) => source !== e.target.value));
    }
  };

  return (
    <div>
      <Form>
        <Container className="newsList">
          <Row>
            <Col>
              <Form.Control type="text" placeholder="search" />
            </Col>
          </Row>
          <Row>
            <NewsList
              type="left"
              list={sourceState.left}
              onChange={handleLeftOnChange}
            />

            <NewsList
              type="left-center"
              list={sourceState.leftCenter}
              onChange={handleLeftCenterOnChange}
            />

            <NewsList
              type="center"
              list={sourceState.center}
              onChange={handleCenterOnChange}
            />

            <NewsList
              type="right-center"
              list={sourceState.rightCenter}
              onChange={handleRightCenterOnChange}
            />

            <NewsList
              type="right"
              list={sourceState.right}
              onChange={handleRightOnChange}
            />
          </Row>
        </Container>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmitButtonOnClick}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewsSettings;
