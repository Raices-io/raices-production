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
				<Text fontSize={1}>This is a test paragraph</Text>
				<Text fontSize={2}>This is a test paragraph</Text>
				<Text fontSize={3}>This is a test paragraph</Text>
				<Text fontSize={4}>This is a test paragraph</Text>
				<Text fontSize={5}>This is a test paragraph</Text>
			</Box>
		</Layout>
	);
};
