import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';

export default function TagCard({ tagObj, handleDelete }) {
  const router = useRouter();
  const { user } = useAuth();

  const isOwner = tagObj.userId === user.id;

  return (
    <Card style={{
      width: '18rem',
      boxShadow: '10px 10px 20px rgba(213, 32, 168, 0.8)', // Shadow to the right and bottom
      backgroundColor: '#00adef',
    }}
    >
      <Card.Body>
        <Card.Title>{tagObj.name}</Card.Title>
        {isOwner && (
        <Button
          style={{
            margin: '5px 3px 5px 3px',
          }}
          onClick={() => router.push(`/tags/${tagObj.id}`)}
        > Edit
        </Button>
        )}
        {isOwner && (
        <Button style={{ margin: '5px 3px 5px 3px' }} onClick={() => handleDelete(tagObj)}>Delete </Button>
        )}
      </Card.Body>
    </Card>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    name: PropTypes.string,
    userId: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
