import moment from 'moment';
import { useForm } from 'react-hook-form';
import { firestore } from '../../util/firebase';
import { useEffect } from 'react';

export default ({ setAddTourLinkModal, selectedHome }) => {
	const { register, setValue, getValues } = useForm();

	const handleScheduleChange = async e => {
		e.preventDefault();
		const data = getValues({ nest: true });
		const date = moment(`${data.tour_date} ${data.tour_hour}`).format('X');
		const homeRef = await firestore.collection('homes').doc(selectedHome.id);
		await homeRef.update({ tour_date: date });
		setAddTourLinkModal(false);
	};

	const handleCancelAppt = async e => {
		e.preventDefault();
		const homeRef = await firestore.collection('homes').doc(selectedHome.id);
		await homeRef.update({ tour_status: 'pending', tour_date: '' });
		setAddTourLinkModal(false);
	};

	const handleAddLink = async e => {
		e.preventDefault();
		const data = getValues({ nest: true });
		const homeRef = await firestore.collection('homes').doc(selectedHome.id);
		await homeRef.update({ tour_src: data.tour_src, tour_status: 'completed', tour_date: null });
		setAddTourLinkModal(false);
	};

	useEffect(() => {
		setValue([
			{ tour_date: moment.unix(selectedHome.tour_date).format('yyyy-MM-DD') },
			{ tour_hour: moment.unix(selectedHome.tour_date).format('HH:mm') },
		]);
	}, []);

	return (
		<div
			className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
			onClick={() => setAddTourLinkModal(false)}>
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
						360° Tour Management
					</h2>
				</div>
				<form className="mt-8">
					<div className="mb-4">
						<label
							htmlFor="tour_date"
							className="block text-sm font-medium leading-5 text-gray-700">
							Date
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<input
								id="tour_date"
								ref={register}
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
								ref={register}
								type="time"
								name="tour_hour"
								className="form-input block w-full sm:text-sm sm:leading-5"
								placeholder="HH:MM"
							/>
						</div>
					</div>

					<div className="mt-6 flex-1 md:grid md:grid-cols-2 md:gap-4">
						<button
							type="button"
							onClick={handleCancelAppt}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-300 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out">
							Cancel Appt
						</button>
						<button
							type="button"
							onClick={handleScheduleChange}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
							Change
						</button>
					</div>
				</form>
				<form className="mt-8">
					<div className="mb-4">
						<label
							htmlFor="tour_src"
							className="block text-sm font-medium leading-5 text-gray-700">
							Link
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<input
								id="tour_src"
								ref={register}
								type="text"
								name="tour_src"
								className="form-input block w-full sm:text-sm sm:leading-5"
								placeholder="https://tours.raices.io/tours/{tourid}"
							/>
						</div>
					</div>
					<div className="mt-6">
						<button
							type="button"
							onClick={handleAddLink}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
							Upload Tour
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
