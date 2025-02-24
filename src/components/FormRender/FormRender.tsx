import React, { useEffect, useState } from "react";
import { IBaseQuestion, QuestionTypes } from "../../models/IFormFields";
import "./formrender.css";

const FormRender = () => {
	const [questions, setQuestions] = useState<IBaseQuestion[]>([]);
	const [formData, setFormData] = useState<{ [key: string]: any }>({});

	useEffect(() => {
		const savedQuestions = localStorage.getItem("formQuestions");
		if (savedQuestions) {
			const parsedQuestions: IBaseQuestion[] = JSON.parse(savedQuestions);
			setQuestions(parsedQuestions);
		}
		console.log("formData", formData);
	}, [formData]);

	const handleChange = (id: string, value: any) => {
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<div className="form-page-wrapper">
			<h2 className="page-title">Rendered Form</h2>
			<form>
				{questions.map((question) => (
					<>
						{!question.isHidden ? (
							<div key={question.id} className="form-group">
								<div className="outlined-input">
									<label htmlFor={question.title}>
										{question.title}
									</label>
									{question.type === QuestionTypes.TEXT && (
										<input
											type="text"
											value={formData[question.id] || ""}
											onChange={(e) =>
												handleChange(
													question.id,
													e.target.value
												)
											}
											required={question.isRequired}
										/>
									)}
									<span className="helper-text">
										{question.helperText}
									</span>
								</div>
								<div className="outlined-input">
									{question.type === QuestionTypes.NUMBER && (
										<>
											<input
												type="number"
												value={
													formData[question.id] || ""
												}
												onChange={(e) =>
													handleChange(
														question.id,
														e.target.value
													)
												}
												min={
													question.numberType?.min ||
													undefined
												}
												max={
													question.numberType?.max ||
													undefined
												}
											/>
											<span className="helper-text">
												{question.helperText}
											</span>
										</>
									)}
								</div>
								<div className="outlined-input">
									{question.type === QuestionTypes.SELECT && (
										<select
											value={formData[question.id] || ""}
											onChange={(e) =>
												handleChange(
													question.id,
													e.target.value
												)
											}
										>
											<option value="">
												Select an option
											</option>
											{question.options?.map(
												(option, index) => (
													<option
														key={index}
														value={option}
													>
														{option}
													</option>
												)
											)}
										</select>
									)}
								</div>
							</div>
						) : (
							""
						)}
					</>
				))}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default FormRender;
