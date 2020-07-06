import styled, { css } from 'styled-components';
import FilterButton from '../../styles/FilterButton';
import { useStateNavigation, useSetNavigation } from '../../context/navigation/NavigationProvider';
import colors from '../../util/colors';
import { Stats, ClearRefinements, connectRange, RefinementList, NumericMenu } from 'react-instantsearch-dom';
import Range from './Algolia/Range';
import { useState } from 'react';

const ConnectedRange = connectRange(Range);
const Price = () => {
	return <ConnectedRange attribute="price" />;
};

const MobileSearchFilters = () => {
	const filterState = useStateNavigation();
	const setFilters = useSetNavigation();

	console.log('FILTERS STATE: ', { ...filterState });

	return (
		<Container>
			<ButtonContainer>
				<FilterButton onClick={() => setFilters?.toggleMobileFilters()}>Filtros</FilterButton>
				{!filterState?.showMobileFilters && (
					<StyledClearRefinements
						translations={{
							reset: 'Borrar Filtros',
						}}
					/>
				)}
			</ButtonContainer>

			<FiltersContainer show={filterState?.showMobileFilters}>
				<Filter>
					<Heading>Tipo de Propiedad</Heading>
					<RefinementList
						attribute="sale_type"
						transformItems={items =>
							items.map(item => {
								if (item.label !== 'sale') {
									item.label = 'Alquilar';
								} else {
									item.label = 'Vender';
								}
								return item;
							})
						}
					/>
				</Filter>
				<Filter>
					<Heading style={{ marginBottom: '0.75rem' }}>Precio</Heading>
					<Price />
				</Filter>
				<Filter>
					<Heading>Ciudad</Heading>
					<RefinementList
						className="grid"
						attribute="city"
						translations={{
							placeholder: 'Busca por ciudades…',
						}}
					/>
				</Filter>
				<Filter>
					<Heading>Habitaciones</Heading>
					<NumericMenu
						attribute="bedrooms"
						items={[
							{ label: '1+', start: 0 },
							{ label: '2+', start: 2 },
							{ label: '3+', start: 3 },
							{ label: '4+', start: 4 },
						]}
						translations={{
							all: 'Todos',
						}}
						transformItems={function (items) {
							return items.sort((i1, i2) => i1.label.localeCompare(i2.label));
						}}
					/>
				</Filter>
				<Filter>
					<Heading>Baños</Heading>
					<NumericMenu
						attribute="bathrooms"
						items={[
							{ label: '1+', start: 0 },
							{ label: '2+', start: 2 },
							{ label: '3+', start: 3 },
							{ label: '4+', start: 4 },
						]}
						translations={{
							all: 'Todos',
						}}
						transformItems={function (items) {
							return items.sort((i1, i2) => i1.label.localeCompare(i2.label));
						}}
					/>
				</Filter>
				<ButtonContainer>
					<StyledClearRefinements
						translations={{
							reset: 'Borrar Filtros',
						}}
					/>
					<Stats
						translations={{
							stats(nbHits) {
								return (
									<Results
										onClick={() =>
											setFilters?.toggleMobileFilters()
										}>{`${nbHits} Resultados`}</Results>
								);
							},
						}}
					/>
				</ButtonContainer>
			</FiltersContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-between;
	position: relative;
    z-index: 1;

	@media (min-width: 1025px) {
		display: none;
	}
`;

const Heading = styled.h4`
	font-size: 0.9rem;
`;

const Filter = styled.div``;

const FiltersContainer = styled.div`
	${({ show }) =>
		!show &&
		css`
			opacity: 0;
			pointer-events: none;
		`}

	position: absolute;
	top: 100%;
	width: 100%;
	height: calc(100vh - 255px);

	@media (max-width: 768px) {
		height: calc(100vh - 180px);
	}

	padding: 0 0.25rem;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	background-color: ${colors('bg.white')};

	.ais-NumericMenu {
		margin: 0.5rem 0;

		.ais-NumericMenu-list {
			display: flex;
			width: 100%;
			border: 1px solid ${colors('border.light')};
			border-radius: 5px;

			.ais-NumericMenu-item {
				flex-grow: 1;
				border-left: 1px solid ${colors('border.light')};

				&:first-child {
					border-radius: 5px 0 0 5px;
					border-left: none;
				}
				&:last-child {
					border-radius: 0 5px 5px 0;
				}

				.ais-NumericMenu-label {
					width: 100%;
					display: flex;
					justify-content: center;
				}

				.ais-NumericMenu-labelText {
					display: block;
					color: ${colors('primary')};
					text-align: center;
					padding: 0.25rem 0;
					width: 100%;
					font-size: 0.9rem;
					cursor: pointer;
				}
				.ais-NumericMenu-radio {
					display: none;
				}
			}

			.ais-NumericMenu-item--selected {
				.ais-NumericMenu-labelText {
					color: ${colors('text.white')};
					background-color: ${colors('primary')};
				}
			}

			.ais-NumericMenu-item--noRefinement {
				.ais-NumericMenu-labelText {
					color: ${colors('text.light')};
					cursor: default;
				}
			}
		}
	}

	.ais-RefinementList {
		margin-top: 0.5rem;

		.ais-SearchBox {
			position: relative;

			.ais-SearchBox-reset {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				margin-right: 1rem;
				fill: #a0aec0;

				svg {
					width: 10px;
					height: 10px;
				}
			}

			.ais-SearchBox-form {
				height: 100%;
				width: 100%;
				margin-bottom: 1rem;
			}
			.ais-SearchBox-input {
				padding: 0.25rem 2.5rem;
				border-radius: 5px;
				width: 100%;
				color: #4d4d4d;
				font-size: 0.9rem;
				border: 1px solid ${colors('text.light')};
				&:focus {
					outline: none;
				}
			}
			.ais-SearchBox-submit {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				margin-left: 1rem;
				fill: #a0aec0;
				border: none;
				outline: none;
			}
			.ais-SearchBox-submitIcon {
				width: 15px;
				height: 15px;
			}
		}

		.ais-RefinementList-list {
			display: grid;
			grid-template-columns: 1fr 1fr;

			.ais-RefinementList-item {
				margin-bottom: 0.5rem;

				.ais-RefinementList-label {
					display: flex;
					align-items: center;
					font-size: 0.9rem;

					.ais-RefinementList-checkbox {
						margin-right: 0.5rem;
						height: 0.9rem;
						width: 0.9rem;
					}

					.ais-RefinementList-count {
						margin-left: 1rem;
					}
				}
			}
		}
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-right: 0.5rem;

	&:last-child {
		margin: 0;
	}
`;

const Results = styled.button`
	display: block;
	padding: 0.25rem 1rem;
	border: 1px solid ${colors('primary')};
	color: ${colors('primary')};
	border-radius: 5px;
	font-size: 0.9rem;
	height: fit-content;
`;

const StyledClearRefinements = styled(ClearRefinements)`
	.ais-ClearRefinements-button {
		padding: 0.25rem 1rem;
		border: 1px solid ${colors('text.light')};
		color: ${colors('text.light')};
		font-size: 0.9rem;
		border-radius: 5px;
		height: fit-content;

		&:hover {
			border: 1px solid ${colors('primary')};
			color: ${colors('primary')};
		}
	}
`;

export default MobileSearchFilters;
