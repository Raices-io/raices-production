import colors from '../../util/colors';
import styled from 'styled-components';

const Features = () => {
	return (
		<FeaturesContainer className="pb-12 mt-12 mb-6 bg-white">
			<div className="max-w-screen-xl mx-auto">
				<div className="lg:text-center flex flex-col items-start sm:items-center">
					<HeadingThree className="mt-2 mb-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
						Encuentra tu próximo hogar. Conecta directamente con agentes. Sin&nbsp;contratiempos.
					</HeadingThree>
				</div>

				<div className="mt-10">
					<ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
						<li className="">
							<div className="flex">
								<div className="flex-shrink-0">
									<div className="svg-container flex items-center justify-center h-12 w-12 rounded-md text-white">
										<svg
											className="h-6 w-6"
											stroke={colors('text.white')}
											fill="none"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
											/>
										</svg>
									</div>
								</div>
								<div className="ml-4">
									<h5 className="text-lg leading-6 font-medium text-gray-900">
										Encuentra tu próxima casa
									</h5>
									<p className="mt-2 text-base leading-6 text-gray-500">
										Recibe la información que necesitas, en cualquier ciudad.
									</p>
								</div>
							</div>
						</li>
						<li className="mt-10 md:mt-0">
							<div className="flex">
								<div className="flex-shrink-0">
									<div className="svg-container flex items-center justify-center h-12 w-12 rounded-md text-white">
										<svg
											className="h-6 w-6"
											stroke={colors('text.white')}
											fill="none"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
											/>
										</svg>
									</div>
								</div>
								<div className="ml-4">
									<h5 className="text-lg leading-6 font-medium text-gray-900">
										Sin intermediarios
									</h5>
									<p className="mt-2 text-base leading-6 text-gray-500">
										Conecta con solo un agente por propiedad, directamente.
									</p>
								</div>
							</div>
						</li>
						<li className="mt-10 md:mt-0">
							<div className="flex">
								<div className="flex-shrink-0">
									<div className="svg-container flex items-center justify-center h-12 w-12 rounded-md text-white">
										<svg
											className="h-6 w-6"
											stroke={colors('text.white')}
											fill="none"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
									</div>
								</div>
								<div className="ml-4">
									<h5 className="text-lg leading-6 font-medium text-gray-900">
										Información actualizada
									</h5>
									<p className="mt-2 text-base leading-6 text-gray-500">
										Nos aseguramos de que las propiedades en nuestra página estén
										realmente a la venta.
									</p>
								</div>
							</div>
						</li>
						<li className="mt-10 md:mt-0">
							<div className="flex">
								<div className="flex-shrink-0">
									<div className="svg-container flex items-center justify-center h-12 w-12 rounded-md text-white">
										<svg
											className="h-6 w-6"
											stroke={colors('text.white')}
											fill="none"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
											/>
										</svg>
									</div>
								</div>
								<div className="ml-4">
									<h5 className="text-lg leading-6 font-medium text-gray-900">
										Envía mensajes directamente a los agentes
									</h5>
									<p className="mt-2 text-base leading-6 text-gray-500">
										No es necesario compartir tu información personal – mantén todas tus
										comunicaciones en un mismo lugar.
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</FeaturesContainer>
	);
};

const FeaturesContainer = styled.div`
	.svg-container {
		background-color: ${colors('indigo.500')};
	}
`;

const HeadingThree = styled.h3``;

export default Features;
