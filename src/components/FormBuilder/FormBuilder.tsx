import React, { useCallback, useEffect, useState } from "react";
import {
	IBaseQuestion,
	IFieldError,
	IQuestionErrors,
	LoadingState,
	NumberTypes,
	QuestionTypes,
} from "../../models/IFormFields";
import "./formBuilder.css";
import BindQuestions from "../BindQuestions/BindQuestions";

const FormBuilder: React.FC = () => {
	const [questions, setQuestions] = React.useState<IBaseQuestion[]>([]);
	const [errors, setErrors] = useState<IQuestionErrors>({});
	const [questionLoading, setQuestionLoading] = useState<
		Record<string, LoadingState>
	>({});
	const addQuestion = (): void => {
		const newQuestion: IBaseQuestion = {
			id: Date.now().toString(),
			title: "",
			type: QuestionTypes.EMPTY,
			isRequired: true,
			isHidden: false,
			helperText: "",
			numberType: {
				type: NumberTypes.EMPTY,
				min: 0,
				max: 0,
			},
			options: [],
			optionRaw: "",
			loading: "loading",
		};
		setQuestions([...questions, newQuestion]);
	};

	const validateAndStore = (
		updatedQuestions: IBaseQuestion[],
		questionId?: string
	) => {
		const questionIndex = updatedQuestions.findIndex(
			(q) => q.id === questionId
		);
		if (questionIndex === -1) return;

		const isValid = validate(updatedQuestions[questionIndex]);

		setQuestionLoading((prev) => ({
			...prev,
			[questionId!]: "loading",
		}));

		if (isValid) {
			localStorage.setItem(
				"formQuestions",
				JSON.stringify(updatedQuestions)
			);

			setQuestionLoading((prev) => ({
				...prev,
				[questionId!]: "completed",
			}));

			setTimeout(() => {
				setQuestionLoading((prev) => ({
					...prev,
					[questionId!]: "stopped",
				}));
			}, 1000);
		} else {
			setQuestionLoading((prev) => ({
				...prev,
				[questionId!]: "loading",
			}));
		}
	};

	const handleOnFormChange = useCallback(
		(
			event:
				| React.ChangeEvent<HTMLInputElement>
				| QuestionTypes
				| NumberTypes,
			id: string,
			eventType: "inputType" | "questionType" | "numberSubType"
		) => {
			setQuestions((prevQuestions) =>
				prevQuestions.map((question) => {
					if (question.id !== id) return question;
					let updatedQuestion = { ...question };

					if (eventType === "questionType") {
						updatedQuestion.type = event as QuestionTypes;
					}

					if (
						eventType === "inputType" &&
						typeof event !== "string"
					) {
						const { name, type, value, checked } = event.target;

						if (name.startsWith("numberType.")) {
							const key = name.split(".")[1];
							updatedQuestion.numberType = {
								...question.numberType,
								[key]: value,
							};
						} else if (name === "options") {
							const optionsValue = String(value).trim();
							updatedQuestion.optionRaw = optionsValue;
							updatedQuestion.options = optionsValue
								.split(",")
								.map((opt) => opt.trim())
								.filter((opt) => opt.length > 0)
								.sort();
						} else {
							updatedQuestion = {
								...updatedQuestion,
								[name]: type === "checkbox" ? checked : value,
							};
						}
					}

					if (eventType === "numberSubType") {
						updatedQuestion.numberType = {
							...updatedQuestion.numberType,
							type: event as NumberTypes,
							min: updatedQuestion.numberType?.min ?? 0,
							max: updatedQuestion.numberType?.max ?? 0,
						};
					}

					validateAndStore(
						prevQuestions.map((q) =>
							q.id === id ? updatedQuestion : q
						),
						updatedQuestion.id
					);

					return updatedQuestion;
				})
			);
		},
		[]
	);

	const validate = (question: IBaseQuestion) => {
		const questionErrors: IFieldError[] = [];

		if (!question.title?.trim()) {
			questionErrors.push({
				field: "title",
				hasError: true,
				message: "Question Title is required.",
			});
		}

		if (
			!question.type ||
			question.type === (QuestionTypes.EMPTY as unknown as QuestionTypes)
		) {
			questionErrors.push({
				field: "type",
				hasError: true,
				message: "Question Type is required.",
			});
		}

		if (
			question.type === QuestionTypes.NUMBER &&
			(!question.numberType ||
				question.numberType.type === NumberTypes.EMPTY)
		) {
			questionErrors.push({
				field: "numberType",
				hasError: true,
				message: "Number Type is required.",
			});
		}

		if (
			question.type === QuestionTypes.SELECT &&
			question.options.length <= 0
		) {
			questionErrors.push({
				field: "options",
				hasError: true,
				message: "Select Options is required.",
			});
		}

		setErrors((prevErrors) => ({
			...prevErrors,
			[question.id]: questionErrors.length > 0 ? questionErrors : [],
		}));

		return questionErrors.length === 0;
	};

	const onQuestionDeletedHandler = (id: string) => {
		setQuestions((prevQuestions) => {
			const updatedQuestions = prevQuestions.filter((q) => q.id !== id);

			localStorage.setItem(
				"formQuestions",
				JSON.stringify(updatedQuestions)
			);

			return updatedQuestions;
		});

		setErrors((prevErrors) => {
			const updatedErrors = { ...prevErrors };
			delete updatedErrors[id];
			return updatedErrors;
		});

		setQuestionLoading((prevLoading) => {
			const updatedLoading = { ...prevLoading };
			delete updatedLoading[id];
			return updatedLoading;
		});
	};

	useEffect(() => {
		const savedQuestions = localStorage.getItem("formQuestions");
		if (savedQuestions) {
			const parsedQuestions: IBaseQuestion[] = JSON.parse(savedQuestions);
			setQuestions(parsedQuestions);
		}
	}, []);

	return (
		<div className="form-page">
			<div className="form-page-wrapper">
				<h1 className="page-title">Form Builder</h1>
				{questions.map((questions: IBaseQuestion) => (
					<BindQuestions
						key={questions.id}
						question={questions}
						onFormChange={handleOnFormChange}
						errors={errors[questions.id] || {}}
						loading={questionLoading[questions.id] || "stopped"}
						onQuestionIdDeleted={onQuestionDeletedHandler}
					/>
				))}
				<button onClick={addQuestion} className="question-button">
					+ Add Question
				</button>
			</div>
		</div>
	);
};

export default FormBuilder;
