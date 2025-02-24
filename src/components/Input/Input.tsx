import React from "react";
import { FieldType, IInputBase } from "../../models/IFormFields";

const InputField: React.FC<IInputBase> = ({
	question,
	onFormChange,
	inputProps,
}) => {
	const { label, name, value, errors } = inputProps;

	return (
		<>
			<div className="outlined-input">
				<input
					type="text"
					value={value}
					name={name}
					placeholder={" "}
					onChange={(e) =>
						onFormChange(e, question.id, FieldType.inputType)
					}
					style={errors?.hasError ? { outline: "2px solid red" } : {}}
				/>
				<label htmlFor={name} className="floating-label">
					{label}
				</label>
			</div>
			{/* {errors?.message && <span className="error">{errors.message}</span>} */}
		</>
	);
};

export default InputField;
