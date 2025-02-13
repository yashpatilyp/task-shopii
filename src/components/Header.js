import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Button, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

import Cart from "../pages/Cart";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <>
      <Navbar expand="lg" className="px-3 shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navTitle">
            Shopi
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">All</NavLink>
              <NavLink to="/cloths" className="nav-link">Clothes</NavLink>
              <NavLink to="/electronics" className="nav-link">Electronics</NavLink>
              <NavLink to="/furnitures" className="nav-link">Furnitures</NavLink>
              <NavLink to="/toys" className="nav-link">Toys</NavLink>
            </Nav>

            <Nav>
              {/* If User is Logged In */}
              {user ? (
                <>
                  <Nav.Link> {user.email} </Nav.Link>
                  <Nav.Link as={Link} to="/my-account">My Account</Nav.Link>
                  <Nav.Link as={Link} to="/my-orders">My Orders</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="text-danger">Logout</Nav.Link>
                </>
              ) : (
                // If User is Not Logged In
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
              )}

              <Nav.Link onClick={() => setShowCart(true)}>
                <FaShoppingCart /> Cart {" "}
                {cart.length > 0 && (
                  <Badge bg="danger" className="cart-badge">{cart.length}</Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Cart Modal */}
      <Cart show={showCart} onHide={() => setShowCart(false)} />
    </>
  );
};

export default Header;
