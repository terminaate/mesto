import { RefObject, useEffect } from 'react';

export default (
	ref: RefObject<HTMLElement>,
	then: () => void,
	except?: RefObject<HTMLElement>
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

		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);
};
