import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Table, Container, Row, Col, Form, Button } from "react-bootstrap";
const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sort,setSort]=useState()
  const sortOption = ["name", "class", "roll", "game", "status"];
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    return await axios
      .get("http://localhost:5000/member")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const loadSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:5000/member?q=${value}`)
      .then((res) => setData(res.data), setValue(""))
      .catch((err) => console.log(err));
  };
  const sortData = async(e)=>{
    return await axios
      .get(`http://localhost:5000/member?_sort=${e}&_order=asc`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const filterLoad =async(value)=>{
    return await axios
    .get(`http://localhost:5000/member?status=${value}`)
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
  }
  const loadReset = () => {
   return loadSearch()
  };
  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col lg={4} md={12} sm={12}>
            <div className="search-box">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Search By Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={loadSearch}>
                  Search
                </Button>
                <Button variant="danger" onClick={loadReset}>
                  Reset
                </Button>
              </Form>
            </div>
            <div className="sort-box">
            <Form.Label>Sort</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>sortData(e.target.value)}>
                <option>Open this select menu</option>
                {sortOption.map((i,index)=>(
                <option value={sort}  key={index}>{i}</option>
                ))}
              </Form.Select>
            </div>
            <div className="filter-status">
            <Button variant="primary" type="submit" onClick={()=>filterLoad('active')}>
                  Active
                </Button>
                <Button variant="danger" onClick={()=>filterLoad('inactive')}>
                  Inactive
                </Button>
            </div>
          </Col>
          <Col lg={8} md={12} sm={12}>
            <h3 className="text-center">Search,Sort,Pagination Example</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Roll</th>
                  <th>Game</th>
                  <th>Status</th>
                </tr>
              </thead>
              {data.length === 0 ? (
                <h2>No Data Available</h2>
              ) : (
                data?.map((i, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{i.id}</td>
                      <td>{i.name}</td>
                      <td>{i.class}</td>
                      <td>{i.roll}</td>
                      <td>{i.game}</td>
                      <td>{i.status}</td>
                    </tr>
                  </tbody>
                ))
              )}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
