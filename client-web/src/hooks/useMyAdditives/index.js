import { useCallback, useState } from 'react';

import { listAdditives } from 'services/additivesStore';

export default function useMyAdditives() {
  const [additives, setAdditives] = useState(listAdditives);

  const refetch = useCallback(() => {
    const next = listAdditives();

    setAdditives(next);

    return next;
  }, []);

  return [additives, false, refetch];
}
