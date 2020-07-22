import styled from 'styled-components';
import SideNav from './SideNav/SideNav';
import TopNav from './TopNav';
import Link from 'next/link';

const Layout = ({ children, directory = [] }) => {
	return (
		<LayoutContainer>
			<LogoContainer>
				<Link href="/">
					<a>
						<h1>Dirt</h1>
					</a>
				</Link>
			</LogoContainer>
			<TopNavContainer>
				<TopNav />
			</TopNavContainer>
			<ASide>
				<SideNav directory={directory} />
			</ASide>
			<Content>{children}</Content>
		</LayoutContainer>
	);
};

const LayoutContainer = styled.main`
	display: grid;
	grid-template-columns: 250px 1fr;
	grid-template-rows: 80px 1fr;
	grid-template-areas:
		'logo top-nav'
		'aside content';
	min-height: 100vh;
	max-height: 100vh;
`;

const TopNavContainer = styled.header`
	grid-area: top-nav;
	background-color: #327B87;
`;

const LogoContainer = styled.div`
	grid-area: logo;
	background-color: #327B87;
	display: flex;
	align-items: center;
	padding-left: 1rem;
	a {
		color: #fff;
		margin-bottom: 0;

		h1 {
			margin-bottom: 0;
		}

		&:hover {
			text-decoration: none;
		}
	}
`;

const ASide = styled.aside`
	grid-area: aside;
	background-color: #222;
`;
const Content = styled.section`
	grid-area: content;
	overflow: hidden;
`;

export default Layout;
