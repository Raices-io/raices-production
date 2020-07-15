import { isEqual } from 'lodash';
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import qs from 'qs';
import algoliasearch from 'algoliasearch/lite';
import { findResultsState } from 'react-instantsearch-dom/server';
import Search from '../../components/homes-by-agent/Search';
import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import Layout from '../../components/Layout';
import { useAuth } from '../../util/auth';
import { useRouter } from 'next/router';
import { firebase } from '../../util/firebase';
import PendingHomeForm from '../../components/Forms/PendingHomeForm';
const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const pathToSearchState = path => (path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {});

const searchStateToURL = searchState => {
	delete searchState.page;
	return searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';
};

const DEFAULT_PROPS = {
	searchClient,
	indexName: 'AGENTS',
};

const SearchPage = styled.div`
	display: inline-block;
	vertical-align: top;
	height: 100%;
	width: 100%;
	overflow: auto;
`;

const Page = props => {
	const auth = useAuth();
	const user = auth.user;
	const router = useRouter();
	// ****
	// FIRESTORE
	// ****
	const firestore = firebase.firestore();
	const [loading, setLoading] = useState(false);
	const [pendingHomes, setPendingHomes] = useState(null);
	// ****
	// Get the pending homes for the user
	// ****
	const getPendingHomes = async () => {
		setLoading(p => true);
		await firestore
			.collection('pendingHomes')
			.where('userId', '==', 'admin')
			.get()
			.then(snapshot => {
				let homes = [];
				if (snapshot.empty) {
					setLoading(p => false);
					setPendingHomes(p => []);
					return;
				}
				snapshot.forEach(doc => {
					homes.push({ id: doc.id, ...doc.data() });
				});
				setPendingHomes(p => homes);
				setLoading(p => false);
			});
	};

	// // if not signed in redirect to sign in page
	useEffect(() => {
		if (user == false) {
			router.push('/signin');
		}
	}, [auth, router]);

	// on page load, search for any pending homes attached to the user
	useEffect(() => {
		if (user && !pendingHomes) {
			getPendingHomes();
		}
	}, [user]);
	return (
		<Fragment className=" relative flex flex-col w-screen h-full flex-grow bg-white overflow-y-scroll antialiased">
			<SideNav />
			<Layout>{pendingHomes && <PendingHomeForm pendingHomes={pendingHomes} />}</Layout>
		</Fragment>
	);
};
Page.getInitialProps = async ({ asPath }) => {
	const searchState = pathToSearchState(asPath);
	const resultsState = await findResultsState(Search, {
		...DEFAULT_PROPS,
		searchState,
	});

	return {
		resultsState,
		searchState,
	};
};
export default withRouter(Page);
