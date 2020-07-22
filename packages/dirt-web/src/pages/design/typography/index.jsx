import Layout from '../../../components/Layout';
import PageContainer from '../../../styles/styled-components/PageContainer';
import directory from '../directory';

import { Text, Box } from '@raices/dirt';

export default () => {
	return (
		<Layout directory={directory}>
			<Box py={10} px={9}>
				<h1>Typography</h1>
				<Text>This is a test paragraph</Text>
				<Text size={1}>This is a test paragraph</Text>
				<Text size={2}>This is a test paragraph</Text>
				<Text size={3}>This is a test paragraph</Text>
				<Text size={4}>This is a test paragraph</Text>
				<Text size={5}>This is a test paragraph</Text>
			</Box>
		</Layout>
	);
};
