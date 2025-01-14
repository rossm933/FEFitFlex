import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-duplicates
import Button from 'react-bootstrap/card';
// eslint-disable-next-line import/no-duplicates
import Card from 'react-bootstrap/card';
import Link from 'next/link';
import { deleteExercise } from '../../api/exerciseData';
import { useAuth } from '../../utils/context/authContext';

function ExerciseCard({ exerciseObj, onUpdate }) {
  const { user } = useAuth();

  // * for deleteing events
  const deleteThisExercise = () => {
    if (window.confirm(`Delete ${exerciseObj.exerciseName}?`)) {
      deleteExercise(exerciseObj.id).then(() => onUpdate());
    }
  };

  const isOwner = exerciseObj.userId === user.id;

  return (
    <Card
      id="card"
      style={{
        width: '18rem',
        boxShadow: '10px 10px 20px rgba(255, 255, 153, 0.8)', // Shadow to the right and bottom
        backgroundColor: '#D9DDDC',
        margin: '10px',
        border: 'solid 5px black',
      }}
    >
      <Card.Img variant="top" src={exerciseObj.imageUrl} alt={exerciseObj.exerciseName} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>
          {exerciseObj.exerciseName}
          <br />
        </Card.Title>
        <p className="card-text bold">
          <br />
          <div>
            <Card.Text>
              {exerciseObj.exerciseTag?.map((tag) => (
                <span key={tag.tag.id}>{tag.tag.name} </span>
              ))}
            </Card.Text>
          </div>
        </p>
        <br />
        <Link href={`/exercise/${exerciseObj.id}`} passHref>
          <Button style={{ background: '#926C15', border: 'solid 1px black' }} variant="primary" className="m-2">VIEW</Button>
        </Link>

        {isOwner && (
        <Link href={`/exercise/edit/${exerciseObj.id}`} passHref>
          <Button style={{ background: '#B2AC88', border: 'solid 1px black' }} variant="info">EDIT</Button>
        </Link>
        )}
        {isOwner && (
        <Button variant="danger" style={{ background: '#D2042D', border: 'solid 1px black' }} onClick={deleteThisExercise} className="m-2">
          DELETE
        </Button>
        )}
      </Card.Body>
    </Card>
  );
}

ExerciseCard.propTypes = {
  exerciseObj: PropTypes.shape({
    exerciseName: PropTypes.string,
    id: PropTypes.number,
    uid: PropTypes.string,
    userId: PropTypes.number,
    imageUrl: PropTypes.string,
    exerciseTag: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ExerciseCard;
