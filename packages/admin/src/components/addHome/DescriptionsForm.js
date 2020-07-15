import React, { useState, Fragment } from 'react';
import DescriptionsTextForms from '../Forms/DescriptionsTextForm';
const DescriptionsForm = ({ home, handleFormFieldChange }) => {
	return (
		<form className="pt-4 bg-white flex flex-col flex-grow px-4 pb-0 h-full">
			<div className="flex flex-col flex-grow">
				<DescriptionsTextForms home={home} handleFormFieldChange={handleFormFieldChange} />
			</div>
		</form>
	);
};

export default DescriptionsForm;
