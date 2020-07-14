import moment from 'moment';
import { useForm } from 'react-hook-form';
import { firestore } from '../../util/firebase';

export default ({ setShowScheduleModal, selectedHome }) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = async data => {
		const date = moment(`${data.tour_date} ${data.tour_hour}`).format('X');
		const homeRef = await firestore.collection('homes').doc(selectedHome.id);
		await homeRef.update({ tour_date: date, tour_status: 'scheduled' });
		setShowScheduleModal(false);
	};

	return (
		<div
			className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
			onClick={() => setShowScheduleModal(false)}>
			<div className="fixed inset-0 transition-opacity">
				<div className="absolute inset-0 bg-gray-800 opacity-75"></div>
			</div>

			<div
				className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
				onClick={e => e.stopPropagation()}>
				<div>
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
						Schedule 360° Tour
					</h2>
				</div>
				<form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							htmlFor="tour_date"
							className="block text-sm font-medium leading-5 text-gray-700">
							Date
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<input
								id="tour_date"
								ref={register({ required: true })}
								type="date"
								name="tour_date"
								className="form-input block w-full sm:text-sm sm:leading-5"
								placeholder="HH:MM"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="tour_hour"
							className="block text-sm font-medium leading-5 text-gray-700">
							Time
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<input
								id="tour_hour"
								ref={register({ required: true })}
								type="time"
								name="tour_hour"
								className="form-input block w-full sm:text-sm sm:leading-5"
								placeholder="HH:MM"
							/>
						</div>
					</div>

					<div className="mt-6">
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
							Schedule
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
