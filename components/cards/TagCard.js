import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-duplicates
import Button from 'react-bootstrap/card';
// eslint-disable-next-line import/no-duplicates
import Card from 'react-bootstrap/card';
import { useRouter } from 'next/router';
import { deleteTag } from '../../api/tagData';
import { useAuth } from '../../utils/context/authContext';

function TagCard({ tagObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisTag = () => {
    if (window.confirm(`Delete ${tagObj.name}?`)) {
      deleteTag(tagObj.id).then(() => onUpdate());
    }
  };

  const isOwner = tagObj.userId === user.id;

  return (
    <Card style={{
      width: '18rem',
      boxShadow: '10px 10px 20px rgba(255, 255, 153, 0.8)', // Shadow to the right and bottom
      backgroundColor: '#D9DDDC',
      margin: '10px',
      border: 'solid 5px black',
    }}
    >
      <Card.Body>
        <Card.Title>{tagObj.name}</Card.Title>
        {isOwner && (
        <Button
          style={{ background: '#B2AC88', border: 'solid 1px black' }}
          onClick={() => router.push(`/tag/edit/${tagObj.id}`)}
        > Edit
        </Button>
        )}
        {isOwner && (
        <Button style={{ background: '#D2042D', border: 'solid 1px black' }} onClick={deleteThisTag}>Delete </Button>
        )}
      </Card.Body>
    </Card>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TagCard;
