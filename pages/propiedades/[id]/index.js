import { firestore } from '../../../util/firebase';
import styled from 'styled-components';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import Router, { useRouter } from 'next/router';

import Home from '../../../components/Home/Home';
import Layout from '../../../components/Layout';
import colors from '../../../util/colors';
import ImageGalleryModal from '../../../components/Gallery/ImageGalleryModal';
import ImageGallery from '../../../components/Gallery/ImageGallery';
import { useStateNavigation } from '../../../context/navigation/NavigationProvider';

const HomePage = ({ home }) => {
	const router = useRouter();

	const { showImagesTourModal } = useStateNavigation();

	let images = [];
	home.images.forEach(obj => images.push(obj.downloadURL));

	while (images.length < 5) {
		images.push('');
	}

	if (isEmpty(home)) {
		return (
			<Layout>
				<Container>
					<h1>Oops, no encontramos la propiedad que busca.</h1>
					<Button onClick={() => Router.back()}>Atras</Button>
				</Container>
			</Layout>
		);
	}

	return (
		home && (
			<Layout>
				<PageContainer onClick={e => e.stopPropagation()}>
					<Back>
						<a onClick={() => router.back()}>
							<svg
								width="29"
								height="14"
								viewBox="0 0 29 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1 7H28M7 13L1 7L7 13ZM1 7L7 1L1 7Z"
									stroke="#327B87"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span>Regresar</span>
						</a>
					</Back>
					{showImagesTourModal && <ImageGalleryModal images={images} home={home} />}
					<ImageGallery images={images} />
					<Home home={home} />
				</PageContainer>
			</Layout>
		)
	);
};

HomePage.getInitialProps = async ctx => {
	const { id } = ctx.query;
	const homeRef = firestore.collection('homes').doc(id);
	const imagesRef = firestore.collection('images').where('homeId', '==', id);

	let home = {};
	const [homeData, imagesData] = await Promise.all([homeRef.get(), imagesRef.get()]);
	if (homeData.exists) {
		home = homeData.data();
		home.id = homeData.id;
	}
	if (!imagesData.empty) {
		let images = [];
		imagesData.forEach(image => {
			images.push({ id: image.id, ...image.data() });
		});
		home.images = images;
	}

	return { home };
};

const PageContainer = styled.div``;

const Container = styled.div`
	height: 500px;
	width: min(600px, 90vw);
	margin: 0 auto;

	display: flex;
	flex-direction: column;
	justify-content: center;

	h1 {
		font-size: 1.5rem;
	}
`;

const Button = styled.button`
	padding: 0.5rem 2rem;
	color: ${colors('bg.white')};
	background-color: ${colors('primary')};
	border-radius: 5px;
	font-size: 1rem;
	margin-top: 1rem;
	height: fit-content;
	width: fit-content;

	transition: ${props => props.theme.transitions.bg_hover};

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: ${colors('button.hover')};
	}
`;

const Back = styled.div`
	width: min(1440px, 90vw);
	margin: 0.5rem auto;

	a {
		display: flex;
		align-items: center;
		color: ${colors('text.lighter')};
		width: fit-content;

		cursor: pointer;

		span {
			margin-left: 1rem;
		}

		&:hover {
			span {
				color: ${colors('primary')};
			}
		}
	}
`;

export default HomePage;
