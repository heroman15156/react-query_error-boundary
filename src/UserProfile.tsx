import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async () => {
  const response = await axios.get('http://localhost:8080/users/me').then((resp) => resp?.data);
  return response;
};

export default function UserProfile() {
  const { data, error } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: fetchUser,
    meta: {
      errorMessage: '프로필 정보를 불러올 수 없습니다.',
    },
  });

  console.log(data, 'data', error);
  return <div>User Profile</div>;
}
