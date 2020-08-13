import Layout from '../../../components/Layout';
import PageContainer from '../../../styles/styled-components/PageContainer';
import directory from '../../directory';

import { MainHeaderWithColorAccent, RaicesLogoLight } from '@raices/dirt';

export default () => {
	return (
		<Layout directory={directory}>
			<PageContainer>
				{/* <h1>Headings Page</h1>
				<h2 id="without-logo">Without logo</h2>
				<MainHeaderWithColorAccent
					headline={"Una mejor forma de comprar una propiedad"}
					highlighted={["mejor", "comprar", "propiedad"]}
				/>
				<h2 id="with-logo">With logo</h2>
				<MainHeaderWithColorAccent
					headline={"Una mejor forma de comprar una propiedad"}
					highlighted={["mejor", "comprar", "propiedad"]}
				>
					<RaicesLogoLight />
				</MainHeaderWithColorAccent> */}
				<h1 style={{marginBottom: '5rem'}}>Typography</h1>
				<h1 style={{ fontSize: '72px' }}>Hero Text</h1>
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<h4>Heading 4</h4>
				<div style={{ marginTop: '4rem' }}>
					<h4>SM 14px</h4>
					<p style={{ fontSize: '14px' }}>This is the body text.</p>
					<h4>RG 16px</h4>
					<p style={{ fontSize: '16px' }}>This is the body text.</p>
					<h4>MD 18px</h4>
					<p style={{ fontSize: '18px' }}>This is the body text.</p>
					<h4>LG 24px</h4>
					<p style={{ fontSize: '24px' }}>This is the body text.</p>
				</div>
			</PageContainer>
		</Layout>
	);
};
