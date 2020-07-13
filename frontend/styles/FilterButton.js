import colors from '../util/colors';
import styled, { css } from 'styled-components';

const FilterButton = styled.button`
	padding: 0.25rem 1rem;
	border: 1px solid ${colors('text.light')};
	color: ${colors('text.light')};
	border-radius: 5px;
	font-size: 0.9rem;
	height: fit-content;

	&:focus {
		outline: none;
	}

	&:hover {
		border: 1px solid ${colors('primary')};
		color: ${colors('primary')};
	}

	${props => {
		if (props.priceFilter || props.bedBathFilter || props.cityFilter || props.propertyTypeFilter) {
			return css`
				border: 1px solid ${colors('primary')};
				color: ${colors('text.white')};
				background-color: ${colors('primary')};

				&:hover {
					color: ${colors('text.white')};
				}
			`;
		}
	}}

	${props =>
		props.active &&
		css`
			border: 1px solid ${colors('primary')};
			color: ${colors('primary')};
		`}
`;

export default FilterButton;
