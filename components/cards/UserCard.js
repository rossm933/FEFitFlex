import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function UserCard({ userObj }) {
  return (
    <Card style={{
      width: '18rem',
      boxShadow: '10px 10px 20px rgba(213, 32, 168, 0.8)', // Shadow to the right and bottom
      backgroundColor: '#00adef',
    }}
    >
      <Card.Body>
        <Card.Title>{userObj.imageUrl}</Card.Title>
        <Card.Title>{userObj.name}</Card.Title>
        <Card.Title>{userObj.email}</Card.Title>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    imageUrl: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
