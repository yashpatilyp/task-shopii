import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../AuthContext";


const MyAccount = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '24rem', padding: '20px', textAlign: 'center' }}>
        <Card.Img 
          variant="top" 
          src={user?.photoURL || "https://via.placeholder.com/150"} 
          alt={user?.displayName} 
          className="rounded-circle mx-auto" 
          style={{ width: '100px', height: '100px' }}
        />
        <Card.Body>
          <Card.Text className="text-muted">{user?.email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyAccount;