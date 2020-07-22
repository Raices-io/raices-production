import Layout from '../components/Layout';
import PageContainer from '../styles/styled-components/PageContainer';
import directory from './directory';

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
