import styled from 'styled-components';
import { COLORS } from '../../patterns/colors';

export const Divider = styled.div`
	width: 100%;
	height: 2px;
	background-color: ${props => props.theme?.global?.colors?.bg?.divider || COLORS.neutral[2]};
	margin: 8rem 0;

	@media (max-width: 1024px) {
		margin: 5rem 0;
	}

	@media (max-width: 768px) {
		margin: 4rem auto;
		width: calc(100% - 2rem);
	}
`;
