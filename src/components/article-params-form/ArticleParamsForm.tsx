import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from '../select/Select';
import { Separator } from '../separator';
import { Text } from '../text/Text';

import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClick } from './hooks/useOutsideClick';

// дефолтные значения полей формы
const defaultArticle = {
	fontFamily: defaultArticleState.fontFamilyOption,
	fontColor: defaultArticleState.fontColor,
	backgroundColor: defaultArticleState.backgroundColor,
	contentWidth: defaultArticleState.contentWidth,
	fontSizeOption: defaultArticleState.fontSizeOption,
};

type ArticleParamsFormProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	// состояния полей формы сайдбара
	const [fieldState, setFieldState] = useState(defaultArticle);

	// сайдбар (отркыт/закрыт)
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// клик по стрелке (отркыть/закрыть сайдбар)
	const onClick = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

	// обработчик отправки формы
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// применяем форматирование из формы к статье
		props.setArticleState({
			fontFamilyOption: fieldState.fontFamily,
			fontColor: fieldState.fontColor,
			backgroundColor: fieldState.backgroundColor,
			contentWidth: fieldState.contentWidth,
			fontSizeOption: fieldState.fontSizeOption,
		});
	};

	// сброс полей формы
	const handleReset = () => {
		setFieldState(defaultArticle);
		props.setArticleState(defaultArticleState);
	};

	// закрыть сайдбар по клику вне его
	useOutsideClick({
		isOpen: isOpen,
		ref: formRef,
		onClose: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton onClick={onClick} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={fieldState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFieldState((prevState) => ({
								...prevState,
								fontFamily: selected,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={fieldState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) =>
							setFieldState((prevState) => ({
								...prevState,
								fontSizeOption: selected,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={fieldState.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFieldState((prevState) => ({
								...prevState,
								fontColor: selected,
							}))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={fieldState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFieldState((prevState) => ({
								...prevState,
								backgroundColor: selected,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={fieldState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setFieldState((prevState) => ({
								...prevState,
								contentWidth: selected,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
