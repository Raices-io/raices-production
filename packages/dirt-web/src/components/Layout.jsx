import styled from "styled-components";
import SideNav from "./SideNav/SideNav";

const Layout = ({ children, directory }) => {
	return (
		<LayoutContainer>
			<TopNav />
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
		"top-nav top-nav"
		"aside content";
	min-height: 100vh;
	max-height: 100vh;
`;

const TopNav = styled.header`
	grid-area: top-nav;
	background-color: #888888;
`;

const ASide = styled.aside`
	grid-area: aside;
	background-color: #f4f4f4;
`;
const Content = styled.section`
	grid-area: content;
	overflow: hidden;
`;

export default Layout;
