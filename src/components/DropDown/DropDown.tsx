import React from "react";
import {
	FieldType,
	IDropDownBase,
	NumberTypes,
	QuestionTypes,
} from "../../models/IFormFields";
import { NumberSubTypesList, QuestionsTypeList } from "../../utils";

const DropDownField: React.FC<IDropDownBase> = ({
	question,
	onDropDownChange,
	inputProps,
	options,
	isOpen,
	dropDownOpenHandler,
	fieldType,
}) => {
	const { label, name, value, classname = [], errors } = inputProps;

	const list =
		fieldType === FieldType.questionType
			? QuestionsTypeList
			: NumberSubTypesList;

	return (
		<div className="question-type-dropdown">
			<div
				className="outlined-input"
				onClick={() => dropDownOpenHandler(!isOpen)}
			>
				<span className="input-icon">
					{(() => {
						const IconComponent = list.find(
							(q) => q.type === question.type
						)?.icon;
						return IconComponent ? <IconComponent /> : null;
					})()}
				</span>
				<input
					type="text"
					name={name}
					value={value}
					placeholder=" "
					className={`${classname.join(" ")}`}
					readOnly
					style={errors?.hasError ? { outline: "2px solid red" } : {}}
				/>
				<label htmlFor="question-type" className="floating-label">
					{label}
				</label>
			</div>
			{isOpen && (
				<div className="outlined-select-dropdown">
					<ul>
						{options.map((option) => (
							<li
								onClick={() => {
									onDropDownChange(
										option.type as
											| QuestionTypes
											| NumberTypes,
										question.id
									);
									dropDownOpenHandler(false);
								}}
								key={option.id}
							>
								{option.icon &&
									React.createElement(
										option.icon as React.ElementType,
										{ className: "icons" }
									)}
								<span>{option.type}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropDownField;
