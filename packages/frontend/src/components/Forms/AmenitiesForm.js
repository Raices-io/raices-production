import React from 'react';

const AmenitiesForm = ({ home, handleCheckboxChange }) => {
	return (
		<div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
			<div>
				<h3 className="text-lg leading-6 font-medium text-gray-900">Comodidades</h3>
				<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
					Puede actualizar esta información más tarde.
				</p>
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
												checked={home.amenities.includes('private_yard')}
												onClick={() =>
													handleCheckboxChange(
														'amenities',
														'private_yard',
														!home.amenities.includes('private_yard'),
													)
												}
											/>
										</div>
										<div className="pl-7 text-sm leading-5">
											<label for="comments" className="font-medium text-gray-700">
												Patio privado
											</label>
											<p className="text-gray-500">
												Esta casa tiene un patio privado. Los patios comunitarios
												compartidos no contar.
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
													checked={home.amenities.includes('swimming_pool')}
													onClick={() =>
														handleCheckboxChange(
															'amenities',
															'swimming_pool',
															!home.amenities.includes('swimming_pool'),
														)
													}
												/>
											</div>
											<div className="pl-7 text-sm leading-5">
												<label for="candidates" className="font-medium text-gray-700">
													Piscina
												</label>
												<p className="text-gray-500">
													Esta casa tiene una piscina disponible.
												</p>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<div className="relative flex items-start">
											<div className="absolute flex items-center h-5">
												<input
													id="offers"
													type="checkbox"
													className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													checked={home.amenities.includes('terrace')}
													onClick={() =>
														handleCheckboxChange(
															'amenities',
															'terrace',
															!home.amenities.includes('terrace'),
														)
													}
												/>
											</div>
											<div className="pl-7 text-sm leading-5">
												<label for="offers" className="font-medium text-gray-700">
													Terraza
												</label>
												<p className="text-gray-500">
													Esta casa tiene una o más terrazas.
												</p>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<div className="relative flex items-start">
											<div className="absolute flex items-center h-5">
												<input
													id="offers"
													type="checkbox"
													className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													checked={home.amenities.includes('air_conditioning')}
													onClick={() =>
														handleCheckboxChange(
															'amenities',
															'air_conditioning',
															!home.amenities.includes('air_conditioning'),
														)
													}
												/>
											</div>
											<div className="pl-7 text-sm leading-5">
												<label for="offers" className="font-medium text-gray-700">
													Aire acondicionado
												</label>
												<p className="text-gray-500">
													Esta casa tiene aire acondicionado.
												</p>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<div className="relative flex items-start">
											<div className="absolute flex items-center h-5">
												<input
													id="offers"
													type="checkbox"
													className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													checked={home.amenities.includes('gym')}
													onClick={() =>
														handleCheckboxChange(
															'amenities',
															'gym',
															!home.amenities.includes('gym'),
														)
													}
												/>
											</div>
											<div className="pl-7 text-sm leading-5">
												<label for="offers" className="font-medium text-gray-700">
													Gimnasio
												</label>
												<p className="text-gray-500">Esta casa tiene un gimnasio.</p>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<div className="relative flex items-start">
											<div className="absolute flex items-center h-5">
												<input
													id="offers"
													type="checkbox"
													className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													checked={home.amenities.includes('sauna')}
													onClick={() =>
														handleCheckboxChange(
															'amenities',
															'sauna',
															!home.amenities.includes('sauna'),
														)
													}
												/>
											</div>
											<div className="pl-7 text-sm leading-5">
												<label for="offers" className="font-medium text-gray-700">
													Sauna
												</label>
												<p className="text-gray-500">Esta casa tiene una sauna.</p>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<div className="relative flex items-start">
											<div className="absolute flex items-center h-5">
												<input
													id="offers"
													type="checkbox"
													className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
													checked={home.amenities.includes('furnished')}
													onClick={() =>
														handleCheckboxChange(
															'amenities',
															'furnished',
															!home.amenities.includes('furnished'),
														)
													}
												/>
											</div>
											<div className="pl-7 text-sm leading-5">
												<label for="offers" className="font-medium text-gray-700">
													Amueblado
												</label>
												<p className="text-gray-500">
													Esta casa está completamente amueblada y lista para entrar
													a vivir.
												</p>
											</div>
										</div>
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

export default AmenitiesForm;
