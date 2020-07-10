import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import styled, { css } from 'styled-components';
import NumberFormat from 'react-number-format';
import Link from 'next/link';
import colors from '../../../util/colors';

const Hit = ({ hit }) => {
	return (
		<Link href={`/propiedades/${hit.objectID}`}>
			<StyledHit>
				<div style={{ overflow: 'hidden', borderRadius: '10px', position: 'relative' }}>
					<Picture className="home-image" src={hit.defaultPic}></Picture>
					<div className="price">
						<NumberFormat
							thousandSeparator={true}
							thousandsGroupStyle="thousand"
							displayType="text"
							prefix={'$ '}
							value={hit.price}
						/>
					</div>
				</div>
				<Details>
					<Heading>{hit.title}</Heading>
					<Stats>
						<svg
							width="30"
							height="18"
							viewBox="0 0 30 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.25 9C10.3177 9 12 7.31766 12 5.25C12 3.18234 10.3177 1.5 8.25 1.5C6.18234 1.5 4.5 3.18234 4.5 5.25C4.5 7.31766 6.18234 9 8.25 9ZM24.75 3H14.25C13.8356 3 13.5 3.33562 13.5 3.75V10.5H3V0.75C3 0.335625 2.66438 0 2.25 0H0.75C0.335625 0 0 0.335625 0 0.75V17.25C0 17.6644 0.335625 18 0.75 18H2.25C2.66438 18 3 17.6644 3 17.25V15H27V17.25C27 17.6644 27.3356 18 27.75 18H29.25C29.6644 18 30 17.6644 30 17.25V8.25C30 5.35031 27.6497 3 24.75 3Z"
								fill="#CBD5E0"
							/>
						</svg>
						<span>{hit.bedrooms}</span>
						<svg
							width="23"
							height="23"
							viewBox="0 0 23 23"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1.4375 18.6876C1.4375 19.8314 1.89185 20.9283 2.7006 21.737C3.50935 22.5458 4.60625 23.0001 5.75 23.0001H17.25C18.3937 23.0001 19.4906 22.5458 20.2994 21.737C21.1081 20.9283 21.5625 19.8314 21.5625 18.6876V17.2501H1.4375V18.6876ZM22.2812 12.9376H17.9688V11.5001H20.8438C21.0344 11.5001 21.2172 11.4244 21.352 11.2896C21.4868 11.1548 21.5625 10.972 21.5625 10.7814V10.0626C21.5625 9.87202 21.4868 9.6892 21.352 9.55441C21.2172 9.41962 21.0344 9.3439 20.8438 9.3439H17.25C16.8688 9.3439 16.5031 9.49535 16.2335 9.76493C15.964 10.0345 15.8125 10.4001 15.8125 10.7814V12.9376H12.9375V5.31265C12.9375 4.9314 13.089 4.56576 13.3585 4.29618C13.6281 4.0266 13.9938 3.87515 14.375 3.87515C14.7562 3.87515 15.1219 4.0266 15.3915 4.29618C15.661 4.56576 15.8125 4.9314 15.8125 5.31265V6.0314C15.8125 6.22202 15.8882 6.40484 16.023 6.53963C16.1578 6.67442 16.3406 6.75015 16.5312 6.75015H17.9688C18.1594 6.75015 18.3422 6.67442 18.477 6.53963C18.6118 6.40484 18.6875 6.22202 18.6875 6.0314V5.31265C18.6866 4.6736 18.544 4.04271 18.2699 3.46545C17.9957 2.88819 17.5969 2.37895 17.1022 1.97443C16.6075 1.56991 16.0292 1.28019 15.409 1.12616C14.7888 0.972135 14.1421 0.957632 13.5156 1.0837C11.4681 1.48126 10.0625 3.39718 10.0625 5.4829V12.9376H7.1875V10.7814C7.1875 10.4001 7.03605 10.0345 6.76647 9.76493C6.49688 9.49535 6.13125 9.3439 5.75 9.3439H2.15625C1.96563 9.3439 1.78281 9.41962 1.64802 9.55441C1.51323 9.6892 1.4375 9.87202 1.4375 10.0626V10.7814C1.4375 10.972 1.51323 11.1548 1.64802 11.2896C1.78281 11.4244 1.96563 11.5001 2.15625 11.5001H5.03125V12.9376H0.71875C0.528126 12.9376 0.345309 13.0134 0.210517 13.1482C0.0757252 13.283 0 13.4658 0 13.6564L0 15.0939C0 15.2845 0.0757252 15.4673 0.210517 15.6021C0.345309 15.7369 0.528126 15.8126 0.71875 15.8126H22.2812C22.4719 15.8126 22.6547 15.7369 22.7895 15.6021C22.9243 15.4673 23 15.2845 23 15.0939V13.6564C23 13.4658 22.9243 13.283 22.7895 13.1482C22.6547 13.0134 22.4719 12.9376 22.2812 12.9376Z"
								fill="#CBD5E0"
							/>
						</svg>
						<span>{hit.bathrooms}</span>
					</Stats>
					<div className="price-and-rooms">
						<p className="city">{hit.city}</p>
					</div>
				</Details>
			</StyledHit>
		</Link>
	);
};

const StyledHit = styled.div`
	cursor: pointer;
	min-height: 345px;
	/* border: 1px solid red; */

	.price {
		position: absolute;
		left: 1rem;
		bottom: 0.5rem;

		span {
			font-family: 'Roboto', sans-serif;
			font-size: 1.25rem;
			color: ${colors('text.white')};
		}
	}
`;

const Picture = styled.div`
	${({ src }) => css`
		height: 240px;
		width: 100%;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 70.31%, rgba(0, 0, 0, 0.5) 100%), url("${src}");
		background-size: cover;
		background-position: center;
		position: relative;
	`}

	transition: transform 200ms ease-in-out;
	border-radius: 10px;

	&:hover {
		transform: scale(1.1);
		transition: transform 200ms ease-in-out;
	}
`;

const Details = styled.div`
	margin-top: 0.5rem;

	p {
		font-size: 1rem;
		color: ${colors('text.light')};
	}
`;

const Heading = styled.h3`
	font-family: 'Poppins', sans-serif;
	font-size: 1.25rem;

	display: block;
	text-overflow: ellipsis;
	min-width: 0;
	/* Required for text-overflow to do anything */
	white-space: nowrap;
	overflow: hidden;
`;

const Stats = styled.div`
	display: flex;
	align-items: flex-end;
	margin: 0.5rem 0;
	margin-top: 0;

	svg {
		margin-right: 0.5rem;
	}

	span {
		margin-right: 2rem;
		display: block;
		line-height: 1rem;
		color: ${colors('text.light')};
		font-weight: 600;
		font-size: 1rem;
	}
`;

export default Hit;
