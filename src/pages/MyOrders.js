import React, { useState, useEffect } from "react";
import { ListGroup, Button, Modal } from "react-bootstrap";
import { auth } from "../firebaseConfig"; // Import Firebase Authentication

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        loadOrders(user.uid);
      } else {
        setUserId(null);
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load orders for the logged-in user
  const loadOrders = (uid) => {
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${uid}`)) || [];
    setOrders(savedOrders);
  };

  const handleShowOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>
      {orders.length > 0 ? (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Order Date:</strong> {order.date}
              </div>
              <div>
                <strong>Total Items:</strong> {order.totalItems}
              </div>
              <div>
                <strong>Total Price:</strong> ${order.totalAmount.toFixed(2)}
              </div>
              <Button variant="dark" size="sm" onClick={() => handleShowOrder(order)}>
                View Order
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center mt-3">No orders found.</p>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Order Date: {selectedOrder.date}</h5>
            <h6>Total Items: {selectedOrder.totalItems}</h6>
            <h6>Total Price: ${selectedOrder.totalAmount.toFixed(2)}</h6>
            <ListGroup className="mt-3">
              {selectedOrder.items.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                  <span>{item.title}</span>
                  <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default MyOrders;
