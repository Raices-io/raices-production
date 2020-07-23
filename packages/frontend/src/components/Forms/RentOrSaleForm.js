import React from 'react';

const RentOrSaleForm = ({
	home,
	handleCheckboxChange,
	handleFormFieldChange,
	saleTypeError,
	formValidationSaleType,
	formValidationPrice,
	priceError,
	formValidationArea,
	areaError,
}) => {
	return (
		<div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
			<div>
				<h3 className="text-lg leading-6 font-medium text-gray-900">
					¿Esta casa está en alquiler o en venta?
				</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					Puede actualizar esta información más tarde.
				</p>
				{saleTypeError && <span className="text-sm text-red-600">Por favor rellene este campo</span>}
			</div>
			<div className="mt-6 sm:mt-5">
				<div className="sm:border-t mb-10 sm:border-gray-200 sm:pt-5">
					<fieldset>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
							<div className="mt-4 sm:mt-0 sm:col-span-2">
								<div className="max-w-lg">
									<div className="relative flex items-start">
										<div className="absolute flex items-center h-5">
											<input
												id="comments"
												type="checkbox"
												className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
												checked={home.sale_type.includes('rent')}
												onClick={() => {
													handleCheckboxChange(
														'sale_type',
														'rent',
														!home.sale_type.includes('rent'),
													);
												}}
												onBlur={formValidationSaleType}
											/>
										</div>
										<div className="pl-7 text-sm leading-5">
											<label for="comments" className="font-medium text-gray-700">
												Esta casa esta en renta
											</label>
											<p className="text-gray-500">
												El propietario de esta propiedad está dispuesto a alquilarla
												en un mensual o anual.
											</p>
										</div>
									</div>
									<div className="mt-4">
										<div className="relative flex items-start">
											<div className="absolute flex items-center h-5">
												<input
													id="candidates"
													type="checkbox"
													className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													checked={home.sale_type.includes('sale')}
													onClick={() => {
														handleCheckboxChange(
															'sale_type',
															'sale',
															!home.sale_type.includes('sale'),
														);
													}}
													onBlur={formValidationSaleType}
												/>
											</div>
											<div className="pl-7 text-sm leading-5">
												<label for="candidates" className="font-medium text-gray-700">
													Esta casa esta en venta
												</label>
												<p className="text-gray-500">
													El propietario de esta propiedad está dispuesto a vender
													esta casa a un nuevo dueño.
												</p>
											</div>
										</div>
									</div>
									<h3 className="text-lg mt-6 leading-6 font-medium text-gray-900">
										Precio (COP)
									</h3>
									<div className="mt-4">
										<div className="max-w-lg rounded-md shadow-sm">
											<input
												id="price"
												type="number"
												className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
												onChange={handleFormFieldChange}
												value={home.price}
												name="price"
												onBlur={formValidationPrice}
											/>
										</div>
										{priceError && (
											<span className="text-sm text-red-600">
												Por favor complete el precio
											</span>
										)}
									</div>
									<h3 className="text-lg mt-6 leading-6 font-medium text-gray-900">
										Área (mt2)
									</h3>
									<div className="mt-4">
										<div className="max-w-lg rounded-md shadow-sm">
											<input
												id="area"
												type="number"
												className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
												onChange={handleFormFieldChange}
												value={home.area}
												name="area"
												onBlur={formValidationArea}
											/>
										</div>
										{areaError && (
											<span className="text-sm text-red-600">
												Por favor complete el area
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
	);
};

export default RentOrSaleForm;
