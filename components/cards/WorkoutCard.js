import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-duplicates
import Button from 'react-bootstrap/card';
// eslint-disable-next-line import/no-duplicates
import Card from 'react-bootstrap/card';
import Link from 'next/link';
import { deleteWorkout } from '../../api/workoutData';

function WorkoutCard({ workoutObj, onUpdate }) {
  const deleteThisWorkout = () => {
    if (window.confirm(`Delete ${workoutObj.workoutName}?`)) {
      deleteWorkout(workoutObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>
          {workoutObj.workoutName}
          <br /> {workoutObj.description}{workoutObj.id}
          <br />
        </Card.Title>
        <p className="card-text bold">
          {workoutObj.dateCreated ? workoutObj.dateCreated.slice(0, 10) : ''}
          <br />
        </p>
        {/* *DYNAMIC LINK TO workout DETAILS  */}
        <Link href={`/workout/${workoutObj.id}`} passHref>
          <Button style={{ background: '#ADD8E6', border: 'solid 1px black' }} variant="primary" className="m-2">VIEW</Button>
        </Link>

        <Link href={`/workout/edit/${workoutObj.id}`} passHref>
          <Button style={{ background: '#008000', border: 'solid 1px black' }} variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" style={{ background: '#8b0000', border: 'solid 1px black' }} onClick={deleteThisWorkout} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

WorkoutCard.propTypes = {
  workoutObj: PropTypes.shape({
    workoutName: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    dateCreated: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WorkoutCard;
