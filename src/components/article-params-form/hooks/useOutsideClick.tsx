import { useEffect } from 'react';

type useOutsideClickProps = {
	isOpen: boolean;
	ref: React.RefObject<HTMLFormElement>;
	onClose: () => void;
};

export const useOutsideClick = ({
	isOpen,
	ref,
	onClose,
}: useOutsideClickProps) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				ref.current &&
				!ref.current.contains(target)
			) {
				onClose();
			}
		};
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, ref, onClose]);
};
