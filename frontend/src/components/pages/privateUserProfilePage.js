import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [biography, setBiography] = useState("");
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

  if (!user) {
    return <div><h4>Log in to view this page.</h4></div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 text-center">
          <h1>{user.username}</h1>
        </div>
        <div className="col-md-4 text-end">
          <Button className="me-2" onClick={() => setShowModal(true)}>
            Log Out
          </Button>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Log Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleLogout}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="col-md-8 text-center">
          <textarea
            rows="5"
            className="form-control"
            style={{ maxWidth: "300px" }}
            placeholder="Enter your biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
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
