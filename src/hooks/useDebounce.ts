import { useEffect, useState } from 'react';

export default <T>(value: T, delay = 500) => {
	const [state, setState] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setState(value), delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return state;
}