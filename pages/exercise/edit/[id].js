import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleExercise } from '../../../api/exerciseData';
import ExerciseForm from '../../../components/forms/ExerciseForm';

export default function EditExercse() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleExercise(id).then(setEditItem);
  }, [id]);

  return (<ExerciseForm obj={editItem} />);
}
