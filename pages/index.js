import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getAllUserWorkouts } from '../api/workoutData';
import WorkoutCard from '../components/cards/WorkoutCard';

function Home() {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useAuth();

  console.warn(user);
  const getAllTheWorkouts = () => {
    if (user.id) {
      getAllUserWorkouts(user.id).then(setWorkouts);
    } else {
      console.error('User not logged in.');
    }
  };

  useEffect(() => {
    getAllTheWorkouts();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/workout/new" passHref>
        <Button style={{ background: '#B38B6D', border: 'solid 1px black' }}>Add A Workout</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} onUpdate={getAllTheWorkouts} />
        ))}
      </div>

    </div>
  );
}

export default Home;
