import styled from 'styled-components';
import PriceModal from './Modals/PriceModal';
import BedBathModal from './Modals/BedBathModal';
import FilterButton from '../../styles/FilterButton';
import { useStateNavigation, useSetNavigation } from '../../context/navigation/NavigationProvider';
import CityModal from './Modals/CityModal';
import PropertyTypeModal from './Modals/PropertyTypeModal';
import colors from '../../util/colors';
import { Stats, ClearRefinements } from 'react-instantsearch-dom';

const SearchFilters = () => {
	const filterState = useStateNavigation();
	const setFilters = useSetNavigation();

	console.log('FILTERS STATE: ', { ...filterState });

	return (
		<Container>
			<FiltersContainer>
				<ButtonContainer>
					<FilterButton
						onClick={e => {
							e.stopPropagation();
							setFilters?.togglePriceFilter();
						}}
						priceFilter={filterState?.priceFilter}>
						Precio
					</FilterButton>
					<PriceModal />
				</ButtonContainer>
				<ButtonContainer>
					<FilterButton
						onClick={e => {
							e.stopPropagation();
							setFilters?.toggleBedBathFilter();
						}}
						bedBathFilter={filterState?.bedBathFilter}>
						Baños y Habitaciones
					</FilterButton>
					<BedBathModal />
				</ButtonContainer>
				<ButtonContainer>
					<FilterButton
						onClick={e => {
							e.stopPropagation();
							setFilters?.toggleCityFilter();
						}}
						cityFilter={filterState?.cityFilter}>
						Ciudad
					</FilterButton>
					<CityModal />
				</ButtonContainer>
				<ButtonContainer>
					<FilterButton
						onClick={e => {
							e.stopPropagation();
							setFilters?.togglePropertyTypeFilter();
						}}
						propertyTypeFilter={filterState?.propertyTypeFilter}>
						Tipos de Propiedad
					</FilterButton>
					<PropertyTypeModal />
				</ButtonContainer>
			</FiltersContainer>
			<FiltersContainer>
				<ButtonContainer>
					<Results>
						<Stats
							translations={{
								stats(nbHits) {
									return `${nbHits} Resultados`;
								},
							}}
						/>
					</Results>
				</ButtonContainer>
				<ButtonContainer>
					<StyledClearRefinements
						translations={{
							reset: 'Borrar Filtros',
						}}
					/>
				</ButtonContainer>
			</FiltersContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;

    @media (max-width: 1024px) {
		display: none;
	}
`;

const FiltersContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ButtonContainer = styled.div`
	position: relative;
	margin-right: 1rem;

	&:last-child {
		margin: 0;
	}
`;

const Results = styled.span`
	display: block;
	padding: 0.25rem 1rem;
	border: 1px solid ${colors('primary')};
	color: ${colors('primary')};
	border-radius: 5px;
	font-size: 0.9rem;
	height: fit-content;
	cursor: default;
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

export default SearchFilters;
