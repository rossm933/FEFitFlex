import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createExercise, updateExercise } from '../../api/exerciseData';
import { getAllTags } from '../../api/tagData';

const initialState = {
  exerciseName: '',
  description: '',
  imageUrl: '',
  repetitions: '',
  sets: '',
  weight: '',
  tagIds: [], // Initialize as an empty array
};

export default function ExerciseForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllTags().then(setTags);
    if (obj.id) {
      const tagIds = obj.exerciseTag ? obj.exerciseTag.map((tag) => tag.tag?.id) : [];
      setFormInput({ ...obj, tagIds });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const {
      name, type, checked, value,
    } = e.target;
    if (type === 'checkbox') {
      const currentTagIds = [...formInput.tagIds];
      const tagId = parseInt(value, 10);
      if (checked) {
        currentTagIds.push(tagId);
      } else {
        const index = currentTagIds.indexOf(tagId);
        currentTagIds.splice(index, 1);
      }
      setFormInput((prevState) => ({
        ...prevState,
        tagIds: currentTagIds,
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
    if (obj.id) {
      // Ensure we're sending the correct form input, including tagIds
      updateExercise(payload).then(() => router.push('/exercise/exercisePage'));
    } else {
      // Handle post creation
      createExercise(payload).then(() => {
        router.push('/exercise/exercisePage');
      });
    }
  };

  const isOwner = !obj.id || obj.userId === user.id;

  return (
    <div className="flex w-[500px] mx-auto inter-normal">
      <div className="flex-grow mt-32">
        {isOwner ? (
          <Form onSubmit={handleSubmit}>
            <Form.Label>{obj.id ? 'Update' : 'Create'} Exercise</Form.Label>

            {/* NAME INPUT */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a Name"
                name="exerciseName"
                value={formInput.exerciseName}
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

            {/* CONTENT TEXTAREA */}
            <Form.Group controlId="formRepetitions" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Repetitions"
                style={{ height: '100px' }}
                name="repetitions"
                value={formInput.repetitions}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* CONTENT TEXTAREA */}
            <Form.Group controlId="formSet" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Sets"
                style={{ height: '100px' }}
                name="sets"
                value={formInput.sets}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* CONTENT TEXTAREA */}
            <Form.Group controlId="formWeight" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Weight"
                style={{ height: '100px' }}
                name="weight"
                value={formInput.weight}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* IMAGE URL */}
            <Form.Group controlId="formBasicImage" className="mb-3">
              <Form.Control
                type="url"
                name="imageUrl"
                placeholder="Enter an image URL"
                value={formInput.imageUrl || ''}
                onChange={handleChange}
                className="input rounded-none"
              />
            </Form.Group>

            {/* TAG CHECKBOXES */}
            <div>
              <b>Tags: </b>
              {tags.map((tag) => (
                <label key={tag.id}>
                  <input
                    type="checkbox"
                    value={tag.id}
                    onChange={handleChange}
                    checked={formInput.tagIds.includes(tag.id)} // Safeguard against undefined tagIds
                  />
                  {tag.name}
                </label>
              ))}
            </div>

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="form-button">
              {obj.id ? 'Update' : 'Create'} Exercise
            </Button>
          </Form>
        ) : (
          <p>You do not have permission to edit this exercise.</p>
        )}
      </div>
    </div>
  );
}
ExerciseForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    tagIds: PropTypes.arrayOf(PropTypes.number),
    exerciseName: PropTypes.string,
    description: PropTypes.string,
    userId: PropTypes.number,
    imageUrl: PropTypes.string,
    repetitions: PropTypes.number,
    sets: PropTypes.number,
    weight: PropTypes.number,
    tag: PropTypes.string,
    exerciseTag: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    })),
  }),
};
ExerciseForm.defaultProps = {
  obj: initialState,
};
