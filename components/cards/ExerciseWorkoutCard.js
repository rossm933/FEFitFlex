import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function ExerciseWorkoutCard({ exerciseObj, onRemove }) {
  const RemoveThisExercise = () => {
    if (window.confirm(`Remove ${exerciseObj.exerciseName} from this workout?`)) {
      onRemove(exerciseObj.id); // Call the parent-provided remove function
    }
  };

  return (
    <Card style={{
      width: '18rem', margin: '10px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}
    >
      <Card.Img
        variant="top"
        src={exerciseObj.imageUrl}
        alt={exerciseObj.exerciseName}
        style={{ maxHeight: '150px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '10px' }}>
          {exerciseObj.exerciseName}
        </Card.Title>
        <Card.Text style={{ marginBottom: '5px' }}>
          <strong>Sets:</strong> {exerciseObj.sets}
        </Card.Text>
        <Card.Text style={{ marginBottom: '5px' }}>
          <strong>Reps:</strong> {exerciseObj.repetitions}
        </Card.Text>
        <Card.Text style={{ marginBottom: '5px' }}>
          <strong>Weight:</strong> {exerciseObj.weight} lbs
        </Card.Text>
        {exerciseObj.exerciseTag?.length > 0 && (
          <Card.Text style={{ marginBottom: '10px' }}>
            <strong>Tags:</strong>{' '}
            {exerciseObj.exerciseTag.map((tag) => (
              <span
                key={tag.tag.id}
                style={{
                  backgroundColor: '#e0f7fa', borderRadius: '5px', padding: '2px 6px', margin: '2px', display: 'inline-block',
                }}
              >
                {tag.tag.name}
              </span>
            ))}
          </Card.Text>
        )}
        <div className="d-flex justify-content-between">
          <Link href={`/exercise/editforworkout/${exerciseObj.id}`} passHref>
            <Button variant="info" size="sm">Edit</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={RemoveThisExercise}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ExerciseWorkoutCard.propTypes = {
  exerciseObj: PropTypes.shape({
    id: PropTypes.number,
    exerciseName: PropTypes.string,
    imageUrl: PropTypes.string,
    sets: PropTypes.number,
    repetitions: PropTypes.number,
    weight: PropTypes.number,
    exerciseTag: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ExerciseWorkoutCard;