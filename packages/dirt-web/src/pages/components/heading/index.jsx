import { Box, Text, Heading } from '@raices/dirt';
import Layout from '../../../components/Layout';
import PageContainer from '../../../styles/styled-components/PageContainer';
import directory from '../directory';
import Code from '../../../components/Code';

export default () => {
	const codeFontSize = `<Heading fontSize={6}>This is a Heading</Heading>`;
	const codeEllipsis = `<Box maxWidth={'400px'}>
	<Heading fontSize={6} ellipsis>
		Lorem ipsum dolor sit amet
	</Heading>
</Box>`;
	const codeHighlighted = `<Heading highlighted={['Lorem', 'dolor', 'amet']}>
	Lorem ipsum dolor sit amet
</Heading>`;
	const codeMB = `<Heading mb="4rem">
	Lorem ipsum dolor sit amet
</Heading>`;

	return (
		<Layout directory={directory}>
			<PageContainer>
				<Box maxWidth="900px">
					<Heading fontSize={7} mb="2rem">
						Heading Component
					</Heading>
					<Text>This component is used to render text in a variety of styles.</Text>
					<Text>
						By default, the Text component renders text in a paragraph tag. In addition, Text will
						inherit its font size from its parent unless a size is set with the size prop.
					</Text>

					<Box m={[8, 0, 9, 0]}>
						<Heading fontSize={6} id="properties" mb="3rem">
							Properties
						</Heading>
						<Heading fontSize={5} id="size" mb="1rem">
							Font Size
						</Heading>
						<Heading color="#7C79A6" fontSize={4} mb="1rem">
							Example
						</Heading>
						<Heading fontSize={6}>This is a Heading</Heading>
						<Code code={codeFontSize} />
					</Box>

					<Box m={[0, 0, 9, 0]}>
						<Heading fontSize={5} id="ellipsis" mb="1rem">
							Ellipsis
						</Heading>
						<Heading color="#7C79A6" fontSize={4} mb="1rem">
							Example
						</Heading>
						<Box maxWidth={'400px'}>
							<Heading fontSize={6} ellipsis>
								Lorem ipsum dolor sit amet
							</Heading>
							<Code code={codeEllipsis} />
						</Box>
					</Box>

					<Box m={[0, 0, 9, 0]}>
						<Heading fontSize={5} id="highlighted" mb="1rem">
							Highlighted
						</Heading>
						<Heading color="#7C79A6" fontSize={4} mb="1rem">
							Example
						</Heading>
						<Heading highlighted={['Lorem', 'dolor', 'amet']}>Lorem ipsum dolor sit amet</Heading>
						<Code code={codeHighlighted} />
					</Box>

					<Box m={[0, 0, 9, 0]}>
						<Heading fontSize={5} id="margin-bottom" mb="1rem">
							Margin Bottom
						</Heading>
						<Heading color="#7C79A6" fontSize={4} mb="1rem">
							Example
						</Heading>
						<Heading mb="4rem">Lorem ipsum dolor sit amet</Heading>
						<Code code={codeMB} />
					</Box>
				</Box>
			</PageContainer>
		</Layout>
	);
};
