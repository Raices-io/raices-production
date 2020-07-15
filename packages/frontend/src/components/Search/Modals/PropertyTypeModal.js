import styled, { css } from 'styled-components';
import { useStateNavigation } from '../../../context/navigation/NavigationProvider';
import colors from '../../../util/colors';
import { RefinementList } from 'react-instantsearch-dom';

const PropertyTypeModal = () => {
	const filterState = useStateNavigation();

	return (
		<Container
			show={filterState?.propertyTypeFilter}
			onClick={e => {
				e.stopPropagation();
			}}>
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
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 0.5rem;
	z-index: 30;

	width: fit-content;

	background-color: ${colors('bg.white')};
	padding: 0.5rem 1rem;
	border: 1px solid ${colors('border.light')};
	border-radius: 5px;

	box-shadow: 10px 25px 15px rgba(0, 0, 0, 0.15);

	${({ show }) =>
		!show &&
		css`
			opacity: 0;
			pointer-events: none;
		`}

	.ais-RefinementList-list {
		margin-top: 0.5rem;

		.ais-RefinementList-item {
			margin-bottom: 0.5rem;

			.ais-RefinementList-label {
				display: flex;
				align-items: center;
                font-size: 0.9rem;

				.ais-RefinementList-checkbox {
					margin-right: 1rem;
					height: 0.9rem;
					width: 0.9rem;
				}

				.ais-RefinementList-count {
					margin-left: 1rem;
				}
			}
		}
	}
`;

export default PropertyTypeModal;
