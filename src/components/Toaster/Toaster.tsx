import React from "react";

interface ToasterProps {
	message: string;
}

export const Toaster: React.FC<ToasterProps> = ({ message }) => {
	return (
		<div id="snackbar">
			{message ? message : "Some text some message.."}
		</div>
	);
};

export default Toaster;
