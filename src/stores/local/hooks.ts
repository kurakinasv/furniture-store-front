import * as React from 'react';
import type { ILocalStore } from 'stores/types';

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const refStore = React.useRef<T>(creator());

  React.useEffect(() => {
    const store = refStore.current;

    return () => {
      store?.destroy();
    };
  }, []);

  // eslint-disable-next-line react-hooks/refs
  return refStore.current;
};
