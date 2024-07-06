import React, { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";

const CreateCategoryModal = ({ addCategory, setAddCategory }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = (e) => {
    console.log({
      name,
      icon,
      status,
    });
    handleClose();
  };
  const handleClose = () => setAddCategory(false);
  return (
    <>
      <Modal centered show={addCategory} onHide={handleClose}>
        <Modal.Header className="border-0">
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-0">
          <Card border="light" className="px-0 px-md-4 py-0 border-0">
            <Card.Header className="text-center text-md-center border-0 mb-0 mt-md-0">
              <h4>Create Category</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="categoryName" className="mb-4">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="categoryIcon" className="mb-4">
                  <Form.Label>Category Icon</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="categoryStatus" className="mb-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Create Category
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateCategoryModal;
