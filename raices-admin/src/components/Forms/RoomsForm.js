import React from 'react';

const RoomsForm = ({
	home,
	handleIterationChange,
	handleFormFieldChange,
	homeTypeError,
	bedroomsError,
	bathroomsError,
	formValidationType,
	formValidationBedrooms,
	formValidationBathrooms,
}) => {
	const { home_type, bedrooms, bathrooms, parking_spots } = home;
	return (
		<div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
			<div>
				<h3 className="text-lg leading-6 font-medium text-gray-900">Espacios</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					Puede actualizar esta información más tarde.
				</p>
			</div>
			<div className="mt-6 sm:mt-5">
				<div className="sm:border-t sm:border-gray-200 sm:pt-5">
					<fieldset className="mt-6">
						<legend className="text-base font-medium text-gray-900">Tipo de casa</legend>
						{homeTypeError && (
							<span className="text-sm text-red-600">Por favor enumere el tipo de casa</span>
						)}
						<div className="mt-4">
							<div className="flex items-center">
								<input
									id="push_everything"
									name="home_type"
									value="house"
									checked={home_type === 'house'}
									onChange={handleFormFieldChange}
									onBlur={formValidationType}
									type="radio"
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<label for="push_everything" className="ml-3">
									<span className="block text-sm leading-5 font-medium text-gray-700">
										Casa
									</span>
								</label>
							</div>
							<div className="mt-4 flex items-center">
								<input
									id="push_email"
									name="form-input push_notifications"
									type="radio"
									name="home_type"
									value="apartment"
									checked={home_type === 'apartment'}
									onChange={handleFormFieldChange}
									onBlur={formValidationType}
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<label for="push_email" className="ml-3">
									<span className="block text-sm leading-5 font-medium text-gray-700">
										Apartamento
									</span>
								</label>
							</div>
							<div className="mt-4 flex items-center">
								<input
									id="push_nothing"
									name="home_type"
									value="other"
									checked={home_type === 'other'}
									type="radio"
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									onChange={handleFormFieldChange}
									onBlur={formValidationType}
								/>
								<label for="push_nothing" className="ml-3">
									<span className="block text-sm leading-5 font-medium text-gray-700">
										Otra
									</span>
								</label>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
			<div className="mt-6 sm:mt-5">
				<div className="sm:border-t sm:border-gray-200 sm:pt-5">
					<fieldset className="mt-6">
						<div className="flex flex-col flex-grow justify-start items-start">
							<legend className="text-base font-medium text-gray-900">Dormitorios</legend>
							<p className="text-gray-500">Número de habitaciones en la casa.</p>
							{bedroomsError && (
								<span className="text-sm text-red-600">
									Indique el número de habitaciones.
								</span>
							)}
							<div className="mt-4 w-32 flex justify-between items-center">
								<div
									onClick={e => {
										e.preventDefault();
										handleIterationChange('bedrooms', 0.5, false);
									}}
									className="flex justify-center items-center rounded-full h-8 w-8 bg-white border border-indigo-600">
									<span className="leading-normal text-xl text-indigo-500">-</span>
								</div>
								<span>{bedrooms}</span>
								<div
									onClick={e => {
										e.preventDefault();
										handleIterationChange('bedrooms', 0.5, true);
									}}
									className="flex justify-center items-center rounded-full h-8 w-8 bg-white border border-indigo-600">
									<span className="leading-normal text-xl text-indigo-500">+</span>
								</div>
							</div>
						</div>
					</fieldset>
					<fieldset className="mt-6">
						<div className="flex flex-col flex-grow justify-start items-start">
							<legend className="text-base font-medium text-gray-900">Baños</legend>
							<p className="text-gray-500">
								Cuente los baños que no tienen ducha o bañera como medio baño
							</p>
							{bathroomsError && (
								<span className="text-sm text-red-600">Indique la cantidad de baños.</span>
							)}
							<div className="mt-4 w-32 flex justify-between items-center">
								<div
									onClick={e => {
										e.preventDefault();
										handleIterationChange('bathrooms', 0.5, false);
									}}
									className="flex justify-center items-center rounded-full h-8 w-8 bg-white border border-indigo-600">
									<span className="leading-normal text-xl text-indigo-500">-</span>
								</div>
								<span>{bathrooms}</span>
								<div
									onClick={e => {
										e.preventDefault();
										handleIterationChange('bathrooms', 0.5, true);
									}}
									className="flex justify-center items-center rounded-full h-8 w-8 bg-white border border-indigo-600">
									<span className="leading-normal text-xl text-indigo-500">+</span>
								</div>
							</div>
						</div>
					</fieldset>
					<fieldset className="mt-6">
						<div className="flex flex-col flex-grow justify-start items-start">
							<legend className="text-base font-medium text-gray-900">
								Lugares para aparcar
							</legend>
							<p className="text-gray-500">
								Número de plazas de estacionamiento dedicadas disponibles para esta unidad.
							</p>
							<div className="mt-4 w-32 flex justify-between items-center">
								<div
									onClick={e => {
										e.preventDefault();
										handleIterationChange('parking_spots', 1, false);
									}}
									className="flex justify-center items-center rounded-full h-8 w-8 bg-white border border-indigo-600">
									<span className="leading-normal text-xl text-indigo-500">-</span>
								</div>
								<span>{parking_spots}</span>
								<div
									onClick={e => {
										e.preventDefault();
										handleIterationChange('parking_spots', 1, true);
									}}
									className="flex justify-center items-center rounded-full h-8 w-8 bg-white border border-indigo-600">
									<span className="leading-normal text-xl text-indigo-500">+</span>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
	);
};

export default RoomsForm;
