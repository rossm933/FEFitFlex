import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleExercise } from '../../api/exerciseData';

export default function ViewExercise() {
  const [exerciseDetails, setExerciseDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleExercise(id).then(setExerciseDetails);
  }, [id]);

  return (
    <div
      className="mt-5 d-flex flex-wrap"
    >
      <div className="d-flex flex-column">
        <img src={exerciseDetails.imageUrl} alt={exerciseDetails.exerciseName} style={{ width: '300px', border: 'solid 2px black' }} />
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {exerciseDetails.exerciseName}
        </h5>
        <p> Description: {exerciseDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}
