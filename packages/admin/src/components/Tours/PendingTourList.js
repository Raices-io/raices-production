import useGetHomes from '../../hooks/useGetHomes';
import PendingTourHome from './PendingTourHome';

export default ({ setShowScheduleModal, setSelectedHome }) => {
	const { homes } = useGetHomes();

	return (
		<ul>
			{homes
				.filter(home => home.tour_status === 'pending')
				.map((home, i) => {
					return (
						<PendingTourHome
							setShowScheduleModal={setShowScheduleModal}
							setSelectedHome={setSelectedHome}
							home={home}
							key={home.id}
						/>
					);
				})}
		</ul>
	);
};
