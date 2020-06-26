import TopNav from './Navigation/TopNav';
import BottomNav from './Navigation/BottomNav';
import styled from 'styled-components';

const Layout = ({ children }) => {
	return (
		<Container>
			<div className="z-40 hidden md:block px-12">
				<TopNav fixed />
			</div>
			{children}
			<div className="flex w-full md:hidden">
				<BottomNav />
			</div>
		</Container>
	);
};

const Container = styled.div``;

export default Layout;
