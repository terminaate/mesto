import { motion, useMotionValue } from 'framer-motion';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import cl from './ResizeImage.module.css';
import Button from '@/components/UI/Button';
import { FaImage } from 'react-icons/all';

interface IResizeFile {
	image: string;
	width?: number;
	height?: number;
}

const ResizeImage: FC<IResizeFile> = ({ image, width = 400, height = 400 }) => {
	const containerRef = useRef<null | HTMLDivElement>(null);
	const canvasRef = useRef<null | HTMLCanvasElement>(null);
	const [size, setSize] = useState<number>(0);
	const i = useRef<null | HTMLImageElement>(null);
	const x = useMotionValue<number>(0);
	const y = useMotionValue<number>(0);

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		x.set(0);
		y.set(0);
		setSize(e.target.valueAsNumber);
	};

	const onDragHandler = () => {
		console.log(x.get(), y.get());
		const ctx = canvasRef.current?.getContext('2d')!;

		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		const s = size ? size : height;
		let localY: number = y.get();
		let localX: number = x.get()
		ctx.drawImage(i.current!, 0 , 0, i.current!.width, i.current!.width, localX, localY, size, size);
	};

	const confirmButtonHandler = () => {
		const ctx = canvasRef.current?.getContext('2d')!;
		// ctx.fillStyle = '#fff';
		// ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		const s = size ? size : height;
		ctx.drawImage(i.current!, x.get(), y.get(), s, s);
	};

	useEffect(() => {
		const $i = new Image();
		$i.src = image;
		$i.onload = () => {
			i.current = $i;
		};
	}, []);

	return (
		<div className={cl.mainContainer}>
			<div style={{ maxWidth: width, maxHeight: height }} ref={containerRef} className={cl.resizeImageContainer}>
				<div className={cl.selectedZone} />
				<motion.img
					drag
					style={{ x, y, height: size ? size : '100%' }}
					onDrag={onDragHandler}
					dragConstraints={containerRef}
					dragMomentum={false}
					dragElastic={false}
					src={image} alt='' />
			</div>
			<div className={cl.confirmContainer}>
				<div className={cl.inputRangeContainer}>
					<FaImage className={cl.firstImage} />
					<input type='range' value={size} min={height} max={640} onChange={onChangeInputHandler} />
					<FaImage className={cl.secondImage} />
				</div>
				<Button onClick={confirmButtonHandler}>Подтвердить</Button>
			</div>
			<canvas style={{ position: 'absolute', top: 0, left: 0 }} ref={canvasRef} height={height} width={width} />
		</div>
	);
};

export default ResizeImage;