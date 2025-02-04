import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-duplicates
import Button from 'react-bootstrap/card';
// eslint-disable-next-line import/no-duplicates
import Card from 'react-bootstrap/card';
import Link from 'next/link';
import { deleteWorkout } from '../../api/workoutData';

function WorkoutCard({ workout, onUpdate }) {
  const deleteThisWorkout = () => {
    if (window.confirm(`Delete ${workout.workoutName}?`)) {
      deleteWorkout(workout.id).then(() => onUpdate());
    }
  };

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
      <Card.Body>
        <Card.Title>
          {workout.workoutName}
          <br />
        </Card.Title>
        <p className="card-text bold">
          Date Created: {workout.dateCreated ? new Date(workout.dateCreated).toString().split(' G')[0] : ''}
          <br />
        </p>
        {/* *DYNAMIC LINK TO workout DETAILS  */}
        <Link href={`/workout/${workout.id}`} passHref>
          <Button style={{ background: '#926C15', border: 'solid 1px black' }} variant="primary" className="m-2">VIEW</Button>
        </Link>

        <Link href={`/workout/edit/${workout.id}`} passHref>
          <Button style={{ background: '#B2AC88', border: 'solid 1px black' }} variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" style={{ background: '#D2042D', border: 'solid 1px black' }} onClick={deleteThisWorkout} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    workoutName: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    dateCreated: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WorkoutCard;
