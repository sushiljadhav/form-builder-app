export enum QuestionTypes {
	EMPTY = "",
	TEXT = "Text",
	NUMBER = "Number",
	SELECT = "Select",
}

export enum NumberTypes {
	EMPTY = "",
	DEFAULT = "Default",
	YEAR = "Year",
	MONTH = "Month",
	DAY = "Day",
}

export /**
 * Interface for Form Fields
 * @param id - Unique identifier for the form field
 * @param Title - Title of the form field
 * @param type - Type of the form field (Text, Number, Select)
 * @param isRequired - Whether the form field is required
 * @param isHidden - Whether the form field is hidden
 * @param helperText - Helper text for the form field
 * @returns IFormFields
 */

interface INumberType {
	type: NumberTypes;
	min: number;
	max: number;
}

export interface IBaseQuestion {
	id: string;
	title: string;
	type: QuestionTypes;
	isRequired: boolean;
	isHidden: boolean;
	helperText?: string;
	numberType: INumberType;
	options: string[];
	optionRaw: string;
	loading: LoadingState;
}

export interface IInputProps {
	name: string;
	value: string | number;
	label: string;
	classname?: string[];
	errors?: IFieldError;
}

export interface IOptionBase {
	id: number;
	type: string;
	icon?: React.ComponentType;
}

export enum FieldType {
	inputType = "inputType",
	questionType = "questionType",
	numberSubType = "numberSubType",
}

export type LoadingState = "start" | "loading" | "completed" | "stopped";

export interface BindQuestionsProps {
	question: IBaseQuestion;
	loading?: LoadingState;
	onFormChange: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| QuestionTypes
			| NumberTypes,
		id: string,
		eventType:
			| FieldType.inputType
			| FieldType.questionType
			| FieldType.numberSubType
	) => void;
	onQuestionIdDeleted?: (id: string) => void;
	errors?: IFieldError[];
}

export interface IInputBase extends BindQuestionsProps {
	inputProps: IInputProps;
}

export interface IDropDownBase {
	question: IBaseQuestion;
	inputProps: Partial<IInputProps>;
	options: IOptionBase[];
	isOpen: boolean;
	fieldType:
		| FieldType.inputType
		| FieldType.questionType
		| FieldType.numberSubType;
	onDropDownChange: (type: QuestionTypes | NumberTypes, id: string) => void;
	dropDownOpenHandler: (isOpen: boolean) => void;
}

export interface IFieldError {
	field: string;
	hasError: boolean;
	message: string;
}

export interface IQuestionErrors {
	[questionId: string]: IFieldError[];
}
