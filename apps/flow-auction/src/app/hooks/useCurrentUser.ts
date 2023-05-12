import * as fcl from '@onflow/fcl';
import { CurrentUser } from '@onflow/typedefs';
import { useEffect, useState } from 'react';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const unsubscribe = fcl.currentUser().subscribe((user: CurrentUser) => {
      setCurrentUser(user?.loggedIn ? user : null);
    });

    return () => unsubscribe();
  }, []);

  return currentUser;
}
