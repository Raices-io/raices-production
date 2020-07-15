import React from 'react';
import TextAreaInput from '../FormElements/TextAreaInput';
import MobileWizardNavigation from '../Navigation/MobileWizardNavigation';

const DescriptionsTextForm = ({ home, handleFormFieldChange, updateHome }) => {
	return (
		<div className="bg-white flex flex-col flex-grow  pb-0 h-full overflow-y-scroll">
			<div>
				<h3 className="text-lg leading-6 font-medium text-gray-900">Descripciones</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					Puede actualizar esta información más tarde.
				</p>
			</div>
			<div className="flex flex-col flex-grow">
				<TextAreaInput
					title="Descripcion"
					subtitle="
					Describe la casa"
					value={home.description}
					handleFormFieldChange={handleFormFieldChange}
					name="description"
				/>
				<TextAreaInput
					title="Escuelas cercanas"
					subtitle="Describa las escuelas cercanas."
					value={home.nearby_schools}
					handleFormFieldChange={handleFormFieldChange}
					name="nearby_schools"
				/>
				<TextAreaInput
					title="Hospitales cercanos"
					subtitle="Describa los hospitales cercanos."
					value={home.nearby_hospitals}
					handleFormFieldChange={handleFormFieldChange}
					name="nearby_hospitals"
				/>
				<TextAreaInput
					title="Restaurantes cercanos"
					subtitle="Describa los restaurantes cercanos."
					value={home.nearby_restaurants}
					handleFormFieldChange={handleFormFieldChange}
					name="nearby_restaurants"
					last
				/>
				<MobileWizardNavigation
					errors={false}
					percentage={75}
					images={false}
					addImages={false}
					updateHome={updateHome}
					homeId={home.id}
				/>
			</div>
		</div>
	);
};

export default DescriptionsTextForm;
