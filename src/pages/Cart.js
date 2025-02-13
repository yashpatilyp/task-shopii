import React from "react";
import { Modal, Button, ListGroup, Image, Row, Col } from "react-bootstrap";
import { useCart } from "../CartContext";
import { auth } from "../firebaseConfig";

const Cart = ({ show, onHide }) => {
  const { cart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle Checkout
  const handleCheckout = () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    const userId = user.uid;
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(), // Unique ID for order
      items: cart,
      totalAmount: totalPrice,
      totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
      date: new Date().toLocaleString(),
    };

    // Save order in localStorage for this user
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    localStorage.setItem(`orders_${userId}`, JSON.stringify([...existingOrders, newOrder]));

    // Clear cart after checkout
    clearCart();
    onHide(); // Close modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>My Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length > 0 ? (
          <>
            <ListGroup>
              {cart.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      {item.images?.[0] ? (
                        <Image src={item.images[0]} alt={item.title} fluid rounded width="80" height="80" />
                      ) : (
                        <p>No Image</p>
                      )}
                    </Col>
                    <Col xs={5}>
                      <h6>{item.title}</h6>
                      <p className="mb-0 text-muted">${item.price.toFixed(2)}</p>
                    </Col>
                    <Col xs={4} className="d-flex align-items-center">
                      <Button size="sm" variant="danger" onClick={() => decreaseQuantity(item.id)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button size="sm" variant="success" onClick={() => increaseQuantity(item.id)}>+</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

           
            <div className="d-flex justify-content-between mt-3">
              <h5>Total:</h5>
              <h5>${totalPrice.toFixed(2)}</h5>
            </div>

          
            <Button variant="dark" className="w-100 mt-3" onClick={handleCheckout}>
              Checkout
            </Button>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Cart;
