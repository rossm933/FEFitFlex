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
    if (tagObj) setFormInput(tagObj);
  }, [tagObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagObj.id) {
      updateTag(formInput);
      router.push('/tag/tagPage');
    } else {
      const payload = { ...formInput, userId: user.id };
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

  return (
    <Form onSubmit={handleSubmit}>
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

      <Button type="submit">Submit</Button>
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
