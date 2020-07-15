import Layout from "../../../components/Layout";
import PageContainer from "../../../styles/styled-components/PageContainer";
import directory from "../../directory";

import {
	MainHeaderWithColorAccent,
	RaicesLogoLight,
} from "@dirt/design-system";

export default () => {
	return (
		<Layout directory={directory}>
			<PageContainer>
				<h1>Headings Page</h1>
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
				</MainHeaderWithColorAccent>
			</PageContainer>
		</Layout>
	);
};
