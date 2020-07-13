import Link from 'next/link';
import { firestore } from '../../util/firebase';
import moment from 'moment';

export default ({ home, index }) => {
	const handleRequestTour = async e => {
		e.stopPropagation();
		e.preventDefault();
		const homeRef = await firestore.collection('homes').doc(home.id);
		await homeRef.update({ tour_status: 'pending' });
	};

	return (
		<li class={index !== 0 ? 'border-t border-gray-200' : ''}>
			<Link href={`/home/${home.city}/${home.id}`}>
				<a class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
					<div class="px-4 py-4 sm:px-6">
						<div class="flex items-center justify-between">
							<div class="text-sm leading-5 font-medium text-indigo-600 truncate">
								{home.addressLineOne}
							</div>
							{home.tour_status && (
								<div class="ml-2 flex-shrink-0 flex">
									<span
										class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											home.tour_state === 'pending'
												? 'bg-red-100 text-red-800'
												: 'bg-green-100 text-green-800'
										}`}>
										{`Tour is ${home.tour_status}`}
									</span>
								</div>
							)}
						</div>
						<div class="mt-2 sm:flex sm:justify-between">
							<div class="sm:flex">
								<div class="mr-6 flex items-center text-sm leading-5 text-gray-500">
									{home.city}
								</div>
								<div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
									{home.state}
								</div>
							</div>
							{home.tour_date && (
								<div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
									<svg
										class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path
											fill-rule="evenodd"
											d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
											clip-rule="evenodd"
										/>
									</svg>
									<span>
										Tour Scheduled for{' '}
										<time datetime={moment.unix(home.tour_date).format('yyyy-MM-DD')}>
											{moment.unix(home.tour_date).format('ddd Do,  h:mmA')}
										</time>
									</span>
								</div>
							)}
							{!home.tour_status && (
								<div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
									<button
										type="button"
										onClick={handleRequestTour}
										class="inline-flex justify-center py-1 px-4 border border-transparent text-sm leading-6 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none active:bg-indigo-700 transition duration-150 ease-in-out">
										Request Tour
									</button>
								</div>
							)}
						</div>
					</div>
				</a>
			</Link>
		</li>
	);
};
