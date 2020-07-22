import Layout from '../../components/Layout';
import PageContainer from '../../styles/styled-components/PageContainer';
import directory from './directory';

export default () => {
	return (
		<Layout directory={directory}>
			<PageContainer>
				<h1>Design</h1>
			</PageContainer>
		</Layout>
	);
};
