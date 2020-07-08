import { firestore } from '../../../util/firebase';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import Router from 'next/router';

import Home from '../../../components/Home/Home';
import Layout from '../../../components/Layout';
import colors from '../../../util/colors';
import ImageGalleryModal from '../../../components/Gallery/ImageGalleryModal';
import TourModal from '../../../components/Tour/TourModal';
import ImageGallery from '../../../components/Gallery/ImageGallery';

const HomePage = ({ home }) => {
	const [showImageModal, setShowImageModal] = useState(false);
	const [showTourModal, setShowTourModal] = useState(false);

	let images = [];
	home.images.forEach(obj => images.push(obj.downloadURL));

	while (images.length < 5) {
		images.push('');
	}

	console.log(images)

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
				{showImageModal && (
					<ImageGalleryModal setShowImageModal={setShowImageModal} images={images} />
				)}
				{showTourModal && <TourModal setShowTourModal={setShowTourModal} tourSrc={home.tour_src} />}
				<ImageGallery images={images} setShowImageModal={setShowImageModal} />
				<Home home={home} setShowTourModal={setShowTourModal} />
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

export default HomePage;
