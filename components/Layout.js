import TopNav from './Navigation/TopNav';
import BottomNav from './Navigation/BottomNav';
import styled, { css } from 'styled-components';
import { useSetNavigation, useStateNavigation } from '../context/navigation/NavigationProvider';

const Layout = ({ children, input, modal, hideBottomNav }) => {
	const setFilters = useSetNavigation();
	const filterState = useStateNavigation();

	return (
		<Container onClick={() => setFilters?.closeFilters()} scroll={!filterState?.showMobileFilters}>
			<TopNavContainer input={input}>
				<TopNav />
			</TopNavContainer>
			<ContentContainer>{children}</ContentContainer>
			{filterState.bottomNav && (
				<BotNavContainer input={input} modal={modal} hideBottomNav={hideBottomNav}>
					<BottomNav />
				</BotNavContainer>
			)}
		</Container>
	);
};

const Container = styled.div`
	overflow: scroll;
	height: 100%;

	${({ scroll }) =>
		!scroll &&
		css`
			height: 100vh;
			overflow: hidden;
		`}
`;

const TopNavContainer = styled.div`
	background-color: white;

	position: fixed;
	z-index: 10;
	top: 0;
	width: 100%;

	@media (max-width: 768px) {
		display: none;
	}
`;

const ContentContainer = styled.div`
	width: min(1440px, 90vw);
	margin: 0 auto;
	padding-top: 96px;
	height: 100%;

	@media (max-width: 768px) {
		border-radius: 0;
		width: 100%;
		padding-top: 0;
	}
`;

const BotNavContainer = styled.div`
	position: fixed;
	z-index: 10;
	bottom: 0;
	width: 100vw;

	@media (min-width: 769px) {
		display: none;
	}

	${({ input, modal, hideBottomNav }) => {
		if (input || modal || hideBottomNav) {
			return css`
				@media (max-width: 768px) {
					display: none;
				}
			`;
		}
	}}
`;

export default Layout;
