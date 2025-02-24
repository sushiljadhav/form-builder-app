import { QuestionTypes, NumberTypes, IOptionBase } from "./models/IFormFields";
import { FiAlignJustify } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";
import { RxDropdownMenu } from "react-icons/rx";

export const QuestionsTypeList: IOptionBase[] = [
	{
		id: 1,
		type: QuestionTypes.TEXT,
		icon: FiAlignJustify,
	},
	{
		id: 2,
		type: QuestionTypes.NUMBER,
		icon: AiOutlineNumber,
	},
	{
		id: 3,
		type: QuestionTypes.SELECT,
		icon: RxDropdownMenu,
	},
];

export const NumberSubTypesList: IOptionBase[] = [
	{
		id: 1,
		type: NumberTypes.DEFAULT,
	},
	{
		id: 2,
		type: NumberTypes.YEAR,
	},
	{
		id: 3,
		type: NumberTypes.MONTH,
	},
	{
		id: 4,
		type: NumberTypes.DAY,
	},
];
