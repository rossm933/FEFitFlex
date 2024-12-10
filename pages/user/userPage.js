import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member

import { getUserDetails } from '../../api/userData';
import UserCard from '../../components/cards/UserCard';
import { useAuth } from '../../utils/context/authContext';

export default function UserPage() {
  const [, setUsers] = useState([]);
  const { user } = useAuth();

  const getSingleUser = () => {
    getUserDetails(user.id).then(setUsers);
  };

  // make api call to get all venues
  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap"><UserCard key={user.id} userObj={user} onUpdate={getUserDetails} /></div>
    </div>
  );
}
