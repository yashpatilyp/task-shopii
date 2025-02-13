import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Badge, Form } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

const Toys = () => {
  const [toyProducts, setToyProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const toysCategoryId = 6; 

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        // Filter products by Toys category ID
        const filteredProducts = response.data.filter(
          (product) => product.category.id === toysCategoryId
        );
        setToyProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching toy products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <p className="text-center">Toys</p>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search for toys..."
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
          {toyProducts.length > 0 ? (
            toyProducts
              .filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <Col lg={3} md={4} sm={6} key={product.id}>
                  <Card className="mb-4 shadow-sm position-relative">
                    {/* Plus Button */}
                    <div className="plus-icon">
                      <FiPlus />
                    </div>

                    {/* Category Badge */}
                    <Badge className="category-badge" bg="light" text="dark">
                      {product.category.name}
                    </Badge>

                    {/* Product Image */}
                    <Card.Img
                      variant="top"
                      className="card-img-fixed"
                      src={product.images[0]}
                      alt={product.title}
                    />

                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          ) : (
            <>
            <img className="m-auto" style={{width:"200px"}} src="https://media.istockphoto.com/id/1417947367/vector/3d-yellow-sad-crying-emoticon-isolated.jpg?s=612x612&w=0&k=20&c=2uNNOkq3iWvG8d0YFA3iyPbvSwNTLd_dpvcAwuLnwV4=" alt="" srcset="" />
            <p className="text-center"><b>Nothing related ( :</b></p>
            </>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Toys;
