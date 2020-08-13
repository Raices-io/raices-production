import styled from 'styled-components';
import { COLORS } from '../../patterns/colors';

export const Square = styled.div`
	height: 25px;
	min-width: 25px;
	border-radius: 5px;
	margin-top: 0.4rem;
	margin-right: 2rem;
	background-color: ${props => props.theme?.global?.colors?.brand?.primary || COLORS.neutral[8]};

	@media (max-width: 768px) {
		height: 20px;
		min-width: 20px;
		margin-top: 0.3rem;
	}

	@media (max-width: 550px) {
		display: none;
	}
`;
