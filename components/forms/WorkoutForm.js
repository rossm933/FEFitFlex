import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createWorkout, updateWorkout } from '../../api/workoutData';

const initialState = {
  description: '',
  workoutName: '',
};

function WorkoutForm({ workout }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (workout.id) setFormInput(workout);
  }, [workout]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workout.id) {
      updateWorkout(formInput);
      router.push('/');
    } else {
      const payload = { ...formInput, userId: user.id };
      createWorkout(payload);
      router.push('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{workout.id ? 'Update' : 'Create'} Workout</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Workout Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="workoutName"
          value={formInput.workoutName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{workout.id ? 'Update' : 'Create'} Workout</Button>
    </Form>
  );
}

WorkoutForm.propTypes = {
  workout: PropTypes.shape({
    description: PropTypes.string,
    workoutName: PropTypes.string,
    userId: PropTypes.number,
    id: PropTypes.number,
  }),
};

WorkoutForm.defaultProps = {
  workout: initialState,
};

export default WorkoutForm;
