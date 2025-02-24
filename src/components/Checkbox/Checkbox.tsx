import React from "react";
import { FieldType, IInputBase } from "../../models/IFormFields";

const CheckBox: React.FC<IInputBase> = ({
	question,
	inputProps,
	onFormChange,
}) => {
	const { label, name, value } = inputProps;
	const isChecked = value === "true" ? true : false;
	return (
		<>
			<div className="outlined-checkbox">
				<input
					type="checkbox"
					checked={isChecked}
					id={`required-checkbox-${question.id}`}
					onChange={(e) =>
						onFormChange(e, question.id, FieldType.inputType)
					}
					name={name}
				/>
				<label htmlFor={`required-checkbox-${question.id}`}>
					{label}
				</label>
			</div>
		</>
	);
};

export default CheckBox;
