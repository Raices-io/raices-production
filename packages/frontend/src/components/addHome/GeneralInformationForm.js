import React, { useState, Fragment, useEffect } from 'react';
import AddressForm from '../Forms/AddressForm';
import AmenitiesForm from '../Forms/AmenitiesForm';
import RoomsForm from '../Forms/RoomsForm';
import RentOrSaleForm from '../Forms/RentOrSaleForm';
import MobileWizardNavigation from '../Navigation/MobileWizardNavigation';

const GeneralInformationForm = ({
	home,
	handleFormFieldChange,
	handleBooleanChange,
	handleCheckboxChange,
	handleIterationChange,
	updateHome,
	homeId,
}) => {
	const [saleTypeError, setSaleTypeError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [barrioError, setBarrioError] = useState(false);
	const [stateError, setStateError] = useState(false);
	const [zipError, setZipError] = useState(false);
	const [priceError, setPriceError] = useState(false);
	const [homeTypeError, setHomeTypeError] = useState(false);
	const [bedroomsError, setBedroomsError] = useState(false);
	const [bathroomsError, setBathroomsError] = useState(false);
	const [areaError, setAreaError] = useState(false);
	const { owner } = home;

	const formValidationTitle = () => {
		// validation for title form
		if (home.title.length < 1) {
			setTitleError(true);
		} else {
			setTitleError(false);
		}
	};
	const formValidationAddress = () => {
		// Validation for address form
		if (home.addressLineOne.length < 1) {
			setAddressError(true);
		} else {
			setAddressError(false);
		}
	};
	const formValidationPrice = () => {
		// Validation for address form
		if (home.price.length <= 1) {
			setPriceError(true);
		} else {
			setPriceError(false);
		}
	};
	const formValidationArea = () => {
		// Validation for address form
		if (home.area.length <= 1) {
			setAreaError(true);
		} else {
			setAreaError(false);
		}
	};
	const formValidationCity = () => {
		if (home.city.length < 1) {
			setCityError(true);
		} else {
			setCityError(false);
		}
	};
	const formValidationBarrio = () => {
		if (home.barrio.length < 1) {
			setBarrioError(true);
		} else {
			setBarrioError(false);
		}
	};
	const formValidationState = () => {
		if (home.state.length < 1) {
			setStateError(true);
		} else {
			setStateError(false);
		}
	};
	const formValidationZip = () => {
		if (home.zip.length < 1) {
			setZipError(true);
		} else {
			setZipError(false);
		}
	};
	const formValidationBedrooms = () => {
		// Bed/bath validation
		if (home.bedrooms == 0) {
			setBedroomsError(true);
		} else {
			setBedroomsError(false);
		}
	};
	const formValidationBathrooms = () => {
		if (home.bathrooms == 0) {
			setBathroomsError(true);
		} else {
			setBathroomsError(false);
		}
	};
	const formValidationSaleType = () => {
		// Validation for rent or sale form
		if (home.sale_type.length < 1) {
			setSaleTypeError(true);
		} else {
			setSaleTypeError(false);
		}
	};
	const formValidationType = () => {
		// Validation for home type
		if (home.home_type.length == 0) {
			setHomeTypeError(true);
		} else {
			setHomeTypeError(false);
		}
	};
	const runValidation = () => {
		formValidationType();
		formValidationSaleType();
		formValidationBathrooms();
		formValidationBedrooms();
		formValidationZip();
		formValidationCity();
		formValidationState();
		formValidationAddress();
	};
	useEffect(() => {
		if (home.bedrooms !== 0) {
			formValidationBedrooms();
		}
	}, [home.bedrooms]);
	useEffect(() => {
		if (home.bathrooms !== 0) {
			formValidationBathrooms();
		}
	}, [home.bathrooms]);
	return (
		// Home ownership form
		<form className="pt-4 bg-white flex flex-col flex-grow px-4 pb-0 h-full overflow-y-scroll">
			<div className="flex flex-col flex-grow flex-shrink-0">
				<div className="pt-8 sm:mt-5 sm:pt-10">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">Propiedad</h3>
						<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
							Nuestro equipo se comunicará con usted para verificar estos detalles antes de su
							publicación.
						</p>
					</div>
				</div>
				<div className="mt-6 sm:mt-5">
					<div className="sm:border-t sm:border-gray-200 sm:pt-5">
						<fieldset className="mt-6">
							<legend className="text-base font-medium text-gray-900">
								¿Quién representa esta casa?
							</legend>
							<div className="mt-4">
								<div className="flex items-center">
									<input
										id="agent"
										name="agent"
										type="radio"
										className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
										checked={!owner}
										value={!owner}
										onClick={() => handleBooleanChange('owner', false)}
									/>
									<label for="agent" className="ml-3">
										<span className="block text-sm leading-5 font-medium text-gray-700">
											Estaré representando esta casa
										</span>
									</label>
								</div>
							</div>
							<div className="mt-4">
								<div className="flex items-center">
									<input
										id="owner"
										name="owner"
										type="radio"
										className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
										checked={owner}
										value={owner}
										onClick={() => handleBooleanChange('owner', true)}
									/>
									<label for="owner" className="ml-3">
										<span className="block text-sm leading-5 font-medium text-gray-700">
											Me gustaría que una agente de Raices represente mi casa.
										</span>
									</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<RentOrSaleForm
					home={home}
					handleCheckboxChange={handleCheckboxChange}
					saleTypeError={saleTypeError}
					formValidationSaleType={formValidationSaleType}
					handleFormFieldChange={handleFormFieldChange}
					formValidationPrice={formValidationPrice}
					priceError={priceError}
					areaError={areaError}
					formValidationArea={formValidationArea}
				/>
				<AddressForm
					home={home}
					handleFormFieldChange={handleFormFieldChange}
					addressError={addressError}
					cityError={cityError}
					zipError={zipError}
					stateError={stateError}
					titleError={titleError}
					barrioError={barrioError}
					formValidationAddress={formValidationAddress}
					formValidationCity={formValidationCity}
					formValidationBarrio={formValidationBarrio}
					formValidationState={formValidationState}
					formValidationZip={formValidationZip}
					formValidationTitle={formValidationTitle}
				/>
				<RoomsForm
					home={home}
					handleFormFieldChange={handleFormFieldChange}
					handleIterationChange={handleIterationChange}
					homeTypeError={homeTypeError}
					bedroomsError={bedroomsError}
					bathroomsError={bathroomsError}
					formValidationType={formValidationType}
					formValidationBedrooms={formValidationBedrooms}
					formValidationBathrooms={formValidationBathrooms}
				/>
				<AmenitiesForm home={home} handleCheckboxChange={handleCheckboxChange} />
			</div>
			<MobileWizardNavigation
				errors={
					saleTypeError ||
					home.sale_type == '' ||
					addressError ||
					home.addressLineOne == '' ||
					cityError ||
					home.city == '' ||
					stateError ||
					home.state == '' ||
					zipError ||
					home.zip == '' ||
					homeTypeError ||
					home.home_type == '' ||
					bedroomsError ||
					home.bedrooms == 0 ||
					bathroomsError ||
					home.bathrooms == 0 ||
					priceError ||
					home.price == '' ||
					titleError ||
					home.title == ''
				}
				runValidation={runValidation}
				percentage={25}
				images={null}
				addImages={null}
				updateHome={updateHome}
				homeId={homeId}
			/>
		</form>
	);
};

export default GeneralInformationForm;
