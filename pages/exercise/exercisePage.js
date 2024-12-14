import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member

import { getAllExercises } from '../../api/exerciseData';
import ExerciseCard from '../../components/cards/ExerciseCard';

export default function ExercisePage() {
  // *set state for venues
  const [exercises, setExercises] = useState([]);

  // function to get all venues
  const getAllTheExercises = () => {
    getAllExercises().then(setExercises);
  };

  // make api call to get all venues
  useEffect(() => {
    getAllTheExercises();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/exercise/new" passHref>
        <Button>Create Exercise</Button>
      </Link>
      <div className="d-flex flex-wrap">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exerciseObj={exercise} onUpdate={getAllTheExercises} />)}</div>
    </div>
  );
}
