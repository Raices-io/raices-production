import styled from "styled-components";
import Layout from "../components/Layout";
import directory from "./directory";
import PageContainer from "../styles/styled-components/PageContainer";

const HomePage = () => {
	return (
		<Layout directory={directory}>
			<PageContainer>
				<h1>Dirt Design System</h1>
			</PageContainer>
		</Layout>
	);
};

export default HomePage;
