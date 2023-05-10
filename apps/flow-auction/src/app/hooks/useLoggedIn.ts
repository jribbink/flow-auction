import * as fcl from '@onflow/fcl';
import { CurrentUser } from '@onflow/typedefs';
import { useEffect, useState } from 'react';

export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = fcl.currentUser().subscribe((user: CurrentUser) => {
      console.log('user', user);
      setLoggedIn(user.loggedIn!!);
    });

    return () => unsubscribe();
  }, []);

  return loggedIn;
}
