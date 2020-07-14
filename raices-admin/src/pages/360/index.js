import { useState, Fragment } from 'react';

import PendingTourList from '../../components/Tours/PendingTourList';
import ScheduledTourList from '../../components/Tours/ScheduledTourList';
import ScheduleTourModal from '../../components/Tours/ScheduleTourModal';
import AddTourLinkModal from '../../components/Tours/AddTourLinkModal';
import SideNav from '../../components/SideNav';
import Layout from '../../components/Layout';

export default () => {
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [showAddTourLinkModal, setAddTourLinkModal] = useState(false);
	const [selectedHome, setSelectedHome] = useState({});

	return (
		<Fragment>
			<SideNav />
			<Layout>
				<div className="overflow-scroll">
					<div className="p-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Requested 360° Tour</h3>
						<p className="mt-1 text-sm leading-5 text-gray-500">Select home to schedule tour.</p>
					</div>
					<PendingTourList
						setShowScheduleModal={setShowScheduleModal}
						setSelectedHome={setSelectedHome}
					/>
					<div className="p-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Scheduled 360° Tour</h3>
						<p className="mt-1 text-sm leading-5 text-gray-500">
							Select home to add 360° tour link.
						</p>
					</div>
					<ScheduledTourList
						setAddTourLinkModal={setAddTourLinkModal}
						setSelectedHome={setSelectedHome}
					/>
				</div>
				{showScheduleModal && (
					<ScheduleTourModal
						setShowScheduleModal={setShowScheduleModal}
						selectedHome={selectedHome}
					/>
				)}
				{showAddTourLinkModal && (
					<AddTourLinkModal setAddTourLinkModal={setAddTourLinkModal} selectedHome={selectedHome} />
				)}
			</Layout>
		</Fragment>
	);
};
