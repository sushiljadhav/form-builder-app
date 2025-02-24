import React, { useState } from "react";
import {
	BindQuestionsProps,
	FieldType,
	NumberTypes,
	QuestionTypes,
} from "../../models/IFormFields";
import { NumberSubTypesList, QuestionsTypeList } from "../../utils";
import "./bindQuestions.css";
import InputField from "../Input/Input";
import DropDownField from "../DropDown/DropDown";
import CheckBox from "../Checkbox/Checkbox";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuLoaderCircle } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { RxDragHandleDots2 } from "react-icons/rx";

const BindQuestions: React.FC<BindQuestionsProps> = ({
	question,
	onFormChange,
	errors,
	loading,
	onQuestionIdDeleted,
}) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
	const [isSubTypeDropDownOpen, setIsSubTypeDropDownOpen] =
		useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const getFieldError = (fieldName: string) => {
		if (!Array.isArray(errors)) return undefined;
		const fieldError = errors.find((error) => error.field === fieldName);
		return fieldError
			? {
					field: fieldError.field,
					hasError: fieldError.hasError,
					message: fieldError.message,
			  }
			: {
					field: fieldName,
					hasError: false,
					message: "",
			  };
	};

	const onDropDownChange = (
		type: QuestionTypes | NumberTypes,
		id: string
	) => {
		let fieldType: FieldType = FieldType.questionType;

		if (Object.values(QuestionTypes).includes(type as QuestionTypes)) {
			fieldType = FieldType.questionType;
		} else if (Object.values(NumberTypes).includes(type as NumberTypes)) {
			fieldType = FieldType.numberSubType;
		}

		onFormChange(type, id, fieldType);
	};

	const dropDownOpenHandler = (isOpen: boolean) => {
		setIsDropDownOpen(isOpen);
	};

	const subDropDownOpenHandler = (isOpen: boolean) => {
		setIsSubTypeDropDownOpen(isOpen);
	};

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	const onQuestionDeleted = (id: string) => {
		if (onQuestionIdDeleted !== undefined) {
			onQuestionIdDeleted(id);
		}
	};

	return (
		<div className="question-form-page">
			<div className="form-group-wrapper">
				<div className="accordion-header">
					{isOpen && (
						<InputField
							question={question}
							onFormChange={onFormChange}
							inputProps={{
								label: "Question Title *",
								name: "title",
								value: question.title || "",
								errors: getFieldError("title"),
							}}
						></InputField>
					)}
					{!isOpen && (
						<div className="title-wrapper">
							<span className="question-title-icons">
								<RxDragHandleDots2></RxDragHandleDots2>
							</span>
							<h2>{question.title}</h2>
						</div>
					)}

					<div className="icons-wrapper">
						{loading === "loading" && (
							<span className="loading-icon">
								<LuLoaderCircle />
							</span>
						)}
						{loading === "completed" && !errors?.length && (
							<span className="completed-icon">
								<FaRegCheckCircle />
							</span>
						)}
						{loading === "stopped" && !errors?.length && (
							<span
								className="stopped-icon"
								onClick={() => onQuestionDeleted(question.id)}
							>
								<MdDelete />
							</span>
						)}
						<span className="arrow-icons" onClick={toggleAccordion}>
							<IoIosArrowDown />
						</span>
					</div>
				</div>
				{isOpen && (
					<>
						<div className="question-type-wrapper">
							<DropDownField
								question={question}
								onDropDownChange={onDropDownChange}
								inputProps={{
									name: "question-type",
									value: question.type,
									label: "Question Type *",
									classname: ["select-input"],
									errors: getFieldError("type"),
								}}
								options={QuestionsTypeList}
								isOpen={isDropDownOpen}
								dropDownOpenHandler={dropDownOpenHandler}
								fieldType={FieldType.questionType}
							></DropDownField>

							<div className="permission-wrapper">
								<CheckBox
									question={question}
									onFormChange={onFormChange}
									inputProps={{
										label: "Required",
										name: "isRequired",
										value: question.isRequired
											? "true"
											: "false",
									}}
								></CheckBox>

								<CheckBox
									question={question}
									onFormChange={onFormChange}
									inputProps={{
										label: "Hidden",
										name: "isHidden",
										value: question.isHidden
											? "true"
											: "false",
									}}
								></CheckBox>
							</div>
						</div>
						<InputField
							question={question}
							onFormChange={onFormChange}
							inputProps={{
								label: "Helper Text",
								name: "helperText",
								value: question.helperText || "",
							}}
						></InputField>
						{question.type === QuestionTypes.NUMBER && (
							<div className="question-type-wrapper">
								<DropDownField
									question={question}
									onDropDownChange={onDropDownChange}
									inputProps={{
										name: "numberType",
										value: question?.numberType?.type || "",
										label: "Number Type *",
										errors: getFieldError("numberType"),
									}}
									options={NumberSubTypesList}
									isOpen={isSubTypeDropDownOpen}
									dropDownOpenHandler={subDropDownOpenHandler}
									fieldType={FieldType.numberSubType}
								></DropDownField>
								<InputField
									question={question}
									onFormChange={onFormChange}
									inputProps={{
										label: "Min",
										name: "numberType.min",
										value: question.numberType.min || "",
									}}
								></InputField>
								<InputField
									question={question}
									onFormChange={onFormChange}
									inputProps={{
										label: "Max",
										name: "numberType.max",
										value: question.numberType.max || "",
									}}
								></InputField>
							</div>
						)}

						{question.type === QuestionTypes.SELECT && (
							<div className="options-wrapper">
								<InputField
									question={question}
									onFormChange={onFormChange}
									inputProps={{
										name: "options",
										label: "Options",
										value: question.optionRaw,
										errors: getFieldError("options"),
									}}
								/>
								<span className="instruction">
									Enter options, comma-separated{" "}
								</span>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default BindQuestions;
