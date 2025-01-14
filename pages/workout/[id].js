import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWorkout } from '../../api/workoutData';
import ExerciseWorkoutCard from '../../components/cards/ExerciseWorkoutCard';

export default function ViewWorkout() {
  const [workoutDetails, setWorkoutDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getWorkoutDetails = () => {
    getSingleWorkout(id).then(setWorkoutDetails);
  };

  useEffect(() => {
    getWorkoutDetails();
  }, [id]);
  console.warn(workoutDetails);
  return (
    <div className="mt-5 d-flex flex-column">
      <div className="d-flex">
        {/* Title and content */}
        <div style={{ color: 'black', flex: 1 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{workoutDetails?.workoutName}</h1>
          <h6>{workoutDetails.description}</h6>
          <div style={{ color: 'black', marginBottom: '10px' }}>
            {workoutDetails.exerciseWorkout?.length > 0 ? (
              workoutDetails.exerciseWorkout.map((exerciseWorkout) => (
                <ExerciseWorkoutCard
                  key={exerciseWorkout.id}
                  exerciseObj={{
                    ...exerciseWorkout.exercise, // Spread properties from exercise
                    id: exerciseWorkout.id, // Pass exerciseWorkout's id
                  }}
                  onRemove={() => {
                    console.log(`Remove exercise with ID: ${exerciseWorkout.id}`);
                    // Implement remove functionality if needed
                  }}
                />
              ))
            ) : (
              <p>No exercises added to this workout yet.</p>
            )}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
