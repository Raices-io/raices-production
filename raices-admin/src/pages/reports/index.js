import React, { Fragment } from 'react';
import { withRouter } from 'next/router';
import SideNav from '../../components/SideNav';
import Layout from '../../components/Layout';

const Page = props => {
	return (
		<Fragment>
			<SideNav />
			<Layout>Reports</Layout>
		</Fragment>
	);
};

export default withRouter(Page);
