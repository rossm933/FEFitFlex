import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWorkout } from '../../../api/workoutData';
import WorkoutForm from '../../../components/forms/WorkoutForm';

export default function EditWorkout() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleWorkout(id).then(setEditItem);
  }, [id]);

  return (<WorkoutForm workout={editItem} />);
}
