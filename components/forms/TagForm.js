import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { createTag, updateTag } from '../../api/tagData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
};

export default function TagForm({ tagObj }) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (tagObj.id) setFormInput(tagObj);
  }, [tagObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, userId: user.id };
    if (tagObj.id) {
      updateTag(payload).then(() => router.push('/tag/tagPage'));
    } else {
      createTag(payload);
      router.push('/tag/tagPage');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.warn(tagObj);
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{tagObj.id ? 'Update' : 'Create'} Tag</h2>
      <Form.Group as={Col} md="6" controlId="validationName">
        <Form.Label>Tag Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter tag name"
          name="name"
          value={formInput.name || ''}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a tag name.
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">{tagObj.id ? 'Update' : 'Create'} Tag</Button>
    </Form>
  );
}

TagForm.propTypes = {
  tagObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

TagForm.defaultProps = {
  tagObj: initialState,
};
