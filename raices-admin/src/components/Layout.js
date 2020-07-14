import styled from 'styled-components';

const Layout = ({ children }) => {
	return <Container>{children}</Container>;
};

const Container = styled.div`
	position: relative;
	left: 200px;
	width: calc(100% - 200px);
	min-height: 100%;
	padding: 20px;
	height: 100%;
`;

export default Layout;
