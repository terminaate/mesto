import { motion, MotionProps } from 'framer-motion';
import { FC, HTMLAttributes, ReactNode } from 'react';
import useClasses from '@/hooks/useClassNames';
import cl from './BasicPage.module.css';

type BasicPageProps = MotionProps & HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	className?: string;
}

const BasicPage: FC<BasicPageProps> = ({ className, children, ...props }) => {
	const classNames = useClasses(className!, cl.basicPage);

	return (
		<motion.div className={classNames} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
								exit={{ opacity: 0 }} {...props}>
			{children}
		</motion.div>
	);
};

export default BasicPage;