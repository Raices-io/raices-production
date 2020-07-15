import styled, { css, keyframes } from 'styled-components';
import { useStateNavigation } from '../../../context/navigation/NavigationProvider';
import colors from '../../../util/colors';
import { connectRange, Panel } from 'react-instantsearch-dom';
import Range from '../Algolia/Range';

const ConnectedRange = connectRange(Range);
const Price = () => {
	return <ConnectedRange attribute="price" />;
};

const PriceModal = () => {
	const filterState = useStateNavigation();

	return (
		<Container
			show={filterState?.priceFilter}
			onClick={e => {
				e.stopPropagation();
			}}>
			<Panel header="Precio">
				<Price />
			</Panel>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 0.5rem;
	z-index: 30;

	width: 350px;

	background-color: ${colors('bg.white')};
	padding: 0.5rem 1rem;
	border: 1px solid ${colors('border.light')};
	border-radius: 5px;

	box-shadow: 10px 25px 15px rgba(0, 0, 0, 0.15);

	.ais-Panel-header {
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	${({ show }) =>
		!show &&
		css`
			opacity: 0;
			pointer-events: none;
		`}
`;

export default PriceModal;
