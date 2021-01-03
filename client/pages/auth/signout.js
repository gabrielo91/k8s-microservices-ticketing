import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

function signout() {
  const { success, doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'POST',
  });

  useEffect(() => {
    doRequest();
  }, []);

  useEffect(() => {
    if (success) {
      console.log('success!!');
      Router.push('/');
    }
  }, [success]);

  return <div>Signing u out</div>;
}

export default signout;
