import Link from 'next/link';

import useGetHomes from '../../hooks/useGetHomes';
import ScheduledTourHome from './ScheduledTourHome';

export default ({ setAddTourLinkModal, setSelectedHome }) => {
	const { homes } = useGetHomes();

	return (
		<ul>
			{homes
				.filter(home => home.tour_status === 'scheduled')
				.map((home, i) => {
					return (
						<ScheduledTourHome
							home={home}
							key={home.id}
							setAddTourLinkModal={setAddTourLinkModal}
							setSelectedHome={setSelectedHome}
						/>
					);
				})}
		</ul>
	);
};
