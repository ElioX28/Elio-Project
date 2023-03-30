import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [biography, setBiography] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSaveBiography = () => {
    fetch("http://localhost:8096/privateUserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ biography }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) return <div><h4>Log in to view this page.</h4></div>;
  return (
    <div className="container">
      <div className="col-md-12 text-center">
        <h1>{user && user.username}</h1>
        <div className="col-md-12 text-center">
          <>
            <Button className="me-2" onClick={handleShow}>
              Log Out
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Log Out</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
        <div className="col-md-12 text-center">
          <textarea
            rows="5"
            className="form-control"
            placeholder="Enter your biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleSaveBiography}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
