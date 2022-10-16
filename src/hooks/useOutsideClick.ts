import { RefObject, useEffect } from 'react';

export default (
  ref: RefObject<HTMLElement>,
  then: () => void,
  event: 'mousedown' | 'mouseup' | 'click' = 'mousedown',
  except?: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const { target } = e as MouseEvent & { target: HTMLElement };
      if (null === ref.current) {
        return;
      }

      if (
        !ref.current?.contains(target) &&
        !except?.current?.contains(target)
      ) {
        then();
      }
    };

    document.addEventListener(event, handler);
    return () => document.removeEventListener(event, handler);
  }, []);
};
