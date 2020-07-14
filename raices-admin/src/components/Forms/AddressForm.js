import React from 'react';

const AddressForm = ({
	home,
	handleFormFieldChange,
	addressError,
	cityError,
	stateError,
	zipError,
	titleError,
	formValidationAddress,
	formValidationCity,
	formValidationState,
	formValidationZip,
	formValidationTitle,
}) => {
	return (
		<div className="mt-8">
			<div className="sm:mt-5">
				<h3 className="text-lg leading-6 font-medium text-gray-900">Título</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					Por favor incluya un título descriptivo para el hogar
				</p>
				<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
					<label
						for="street_address"
						className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
						Titulo
					</label>

					<div className="mt-1 sm:mt-0 sm:col-span-2">
						<div className="max-w-lg rounded-md shadow-sm">
							<input
								id="street_address"
								className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								onChange={handleFormFieldChange}
								value={home.title}
								name="title"
								onBlur={formValidationTitle}
							/>
						</div>
						{titleError && (
							<span className="text-sm text-red-600">Por favor complete el título</span>
						)}
					</div>
				</div>
			</div>
			<div className=" mt-8 sm:mt-5">
				<h3 className="text-lg leading-6 font-medium text-gray-900">Direccion</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					Debe incluir la dirección real de la casa.
				</p>
				<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
					<label
						for="street_address"
						className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
						Dirección
					</label>

					<div className="mt-1 sm:mt-0 sm:col-span-2">
						<div className="max-w-lg rounded-md shadow-sm">
							<input
								id="street_address"
								className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								onChange={handleFormFieldChange}
								value={home.addressLineOne}
								name="addressLineOne"
								onBlur={formValidationAddress}
							/>
						</div>
						{addressError && (
							<span className="text-sm text-red-600">Por favor complete la dirección</span>
						)}
					</div>
				</div>
				<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
					<label
						for="street_address"
						className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
						Número de apartamento o información adicional
					</label>
					<div className="mt-1 sm:mt-0 sm:col-span-2">
						<div className="max-w-lg rounded-md shadow-sm">
							<input
								id="street_address"
								className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								onChange={handleFormFieldChange}
								value={home.addressLineTwo}
								name="addressLineTwo"
							/>
						</div>
					</div>
				</div>
				<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
					<label
						for="city"
						className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
						Ciudad
					</label>
					<div className="mt-1 sm:mt-0 sm:col-span-2">
						<div className="max-w-xs rounded-md shadow-sm">
							<input
								id="city"
								className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								onChange={handleFormFieldChange}
								value={home.city}
								name="city"
								onBlur={formValidationCity}
							/>
							{cityError && (
								<span className="text-sm text-red-600">Por favor llene la ciudad</span>
							)}
						</div>
					</div>
				</div>

				<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
					<label
						for="state"
						className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
						Provincia del estado
					</label>
					<div className="mt-1 sm:mt-0 sm:col-span-2">
						<div className="max-w-xs rounded-md shadow-sm">
							<input
								id="state"
								className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								onChange={handleFormFieldChange}
								value={home.state}
								name="state"
								onBlur={formValidationState}
							/>
							{stateError && (
								<span className="text-sm text-red-600">Por favor complete la provincia</span>
							)}
						</div>
					</div>
				</div>

				<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
					<label
						for="zip"
						className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
						name="zip">
						Código postal
					</label>
					<div className="mt-1 sm:mt-0 sm:col-span-2">
						<div className="max-w-xs rounded-md shadow-sm">
							<input
								id="zip"
								name="zip"
								className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								onChange={handleFormFieldChange}
								value={home.zip}
								onBlur={formValidationZip}
							/>
							{zipError && (
								<span className="text-sm text-red-600">
									Por favor complete el código postal
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AddressForm;
