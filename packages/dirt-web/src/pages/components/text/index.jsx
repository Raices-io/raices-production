import { Box, Text } from '@raices/dirt';
import Layout from '../../../components/Layout';
import directory from '../directory';
import Code from '../../../components/Code';
import PageContainer from '../../../styles/styled-components/PageContainer';

export default () => {
	const codeEllipsis = `<Box maxWidth={'200px'}>
    <Text ellipsis>Lorem ipsum dolor sit amet,</Text>
</Box>`;
	const codeSize = `<Text fontSize={6}>Lorem ipsum dolor sit amet</Text>`;

	return (
		<Layout directory={directory}>
			<PageContainer>
				<h1>Text Component</h1>
				<Text>This component is used to render text in a variety of styles.</Text>
				<Text>
					By default, the Text component renders text in a paragraph tag. In addition, Text will
					inherit its font size from its parent unless a size is set with the size prop.
				</Text>
				<Box>
					<h3 id="properties">Properties</h3>
					<h4 id="size">Font Size</h4>
					<h5>Example</h5>
					<Text fontSize={5}>Lorem ipsum dolor sit amet</Text>
					<Code code={codeSize} />
				</Box>
				<Box>
					<h3 id="ellipsis">Ellipsis</h3>
					<h5>Example</h5>
					<Box maxWidth={'200px'}>
						<Text ellipsis>Lorem ipsum dolor sit amet,</Text>
						<Code code={codeEllipsis} />
					</Box>
				</Box>
			</PageContainer>
		</Layout>
	);
};
