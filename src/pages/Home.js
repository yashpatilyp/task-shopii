import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Spinner, Badge, Modal, Button } from "react-bootstrap";
import { FiPlus, FiCheck } from "react-icons/fi"; // Import check icon
import { useCart } from "../CartContext";
import { useAuth } from "../AuthContext";

const Home = () => {
  const { addToCart, cart } = useCart(); // Get cart
  const { user } = useAuth(); // Get user
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Open modal with selected product
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <p className="text-center">Home</p>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box py-3"
          />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {products
            .filter((product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => {
              const isInCart = cart.some((item) => item.id === product.id); // Check if product is in cart

              return (
                <Col lg={3} md={4} sm={6} key={product.id}>
                  <Card
                    className="mb-4 shadow-sm cardHome"
                    onClick={() => handleShowModal(product)}
                  >
                    <div
                      className="plus-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (user) {
                          if (!isInCart) addToCart(product); // Add only if not already in cart
                        } else {
                          alert("Please log in to add items to your cart.");
                        }
                      }}
                    >
                      {isInCart ? <FiCheck color="green" /> : <FiPlus />}
                    </div>
                    <Badge className="category-badge" bg="light" text="dark">
                      {product.category.name}
                    </Badge>
                    <Card.Img className="card-img-fixed" variant="top" src={product.images[0]} alt={product.title} />
                    <Card.Body className="card-body-fixed">
                      <div className="d-flex justify-content-between align-items-center">
                        <Card.Text className="text-muted card-title-fixed">{product.title}</Card.Text>
                        <span className="price">${product.price}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      )}

      {/* Modal to show product details */}
      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="m-auto text-center">
              <Col md={12}>
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="img-fluid rounded"
                  width={200}
                />
              </Col>
              <Col md={12}>
                <h5>{selectedProduct.title}</h5>
                <p>{selectedProduct.description}</p>
                <h4>${selectedProduct.price}</h4>
                <Button
                  variant={cart.some((item) => item.id === selectedProduct.id) ? "secondary" : "success"}
                  onClick={() => {
                    if (user) {
                      if (!cart.some((item) => item.id === selectedProduct.id)) {
                        addToCart(selectedProduct);
                      }
                    } else {
                      alert("Please log in to add items to your cart.");
                    }
                  }}
                  disabled={cart.some((item) => item.id === selectedProduct.id)}
                >
                  {cart.some((item) => item.id === selectedProduct.id) ? "In Cart" : "Add to Cart"}
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Home;
