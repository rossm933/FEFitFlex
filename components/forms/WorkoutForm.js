import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createWorkout, updateWorkout } from '../../api/workoutData';
import { getAllExercises } from '../../api/exerciseData';

const initialState = {
  description: '',
  workoutName: '',
  exerciseIds: [],
};

function WorkoutForm({ workout }) {
  const [formInput, setFormInput] = useState(initialState);
  const [exercises, setExercises] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllExercises().then(setExercises);
    if (workout.id) {
      const exerciseIds = workout.exerciseWorkout ? workout.exerciseWorkout.map((exercise) => exercise.exercise?.id) : [];
      setFormInput({ ...workout, exerciseIds });
    }
  }, [workout, user]);

  const handleChange = (e) => {
    const {
      name, type, checked, value,
    } = e.target;
    if (type === 'checkbox') {
      const currentExerciseIds = [...formInput.exerciseIds];
      const exerciseId = parseInt(value, 10);
      if (checked) {
        currentExerciseIds.push(exerciseId);
      } else {
        const index = currentExerciseIds.indexOf(exerciseId);
        currentExerciseIds.splice(index, 1);
      }
      setFormInput((prevState) => ({
        ...prevState,
        exerciseIds: currentExerciseIds,
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, userId: user.id };

    if (workout.id) {
      updateWorkout(payload)
        .then(() => router.push('/'));
    } else {
      createWorkout(payload)
        .then(() => router.push('/'));
    }
  };

  const isOwner = !workout.id || workout.userId === user.id;

  return (
    <div className="flex w-[500px] mx-auto inter-normal">
      <div className="flex-grow mt-32">
        {isOwner ? (
          <Form onSubmit={handleSubmit}>
            <Form.Label>{workout.id ? 'Update' : 'Create'} Workout</Form.Label>

            {/* TITLE INPUT */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a Title"
                name="workoutName"
                value={formInput.workoutName}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* CONTENT TEXTAREA */}
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Description"
                style={{ height: '100px' }}
                name="description"
                value={formInput.description}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* EXERCISE CHECKBOXES */}
            <div>
              <b>Exercises: </b>
              {exercises.map((exercise) => (
                <label key={exercise.id}>
                  <input
                    type="checkbox"
                    value={exercise.id}
                    onChange={handleChange}
                    checked={formInput.exerciseIds.includes(exercise.id)}
                  />
                  {exercise.exerciseName}
                </label>
              ))}
            </div>

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="form-button">
              {workout.id ? 'Update' : 'Create'} Workout
            </Button>
          </Form>
        ) : (
          <p>You do not have permission to edit this exercise.</p>
        )}
      </div>
    </div>
  );
}

WorkoutForm.propTypes = {
  workout: PropTypes.shape({
    description: PropTypes.string,
    workoutName: PropTypes.string,
    userId: PropTypes.number,
    exercise: PropTypes.string,
    exerciseIds: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    exerciseWorkout: PropTypes.arrayOf(PropTypes.shape({
      exercise: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    })),
  }),
};

WorkoutForm.defaultProps = {
  workout: initialState,
};

export default WorkoutForm;
