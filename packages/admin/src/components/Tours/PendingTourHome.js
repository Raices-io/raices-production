import moment from 'moment';

export default React.memo(({ home, setShowScheduleModal, setSelectedHome }) => {
	const handleClick = clickedHome => {
		setShowScheduleModal(true);
		setSelectedHome(clickedHome);
	};

	return (
		<li onClick={() => handleClick(home)} key={home.id}>
			<div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out m-2 bg-white shadow-sm rounded-lg cursor-pointer">
				<div className="flex items-center px-4 py-4 sm:px-6">
					<div className="min-w-0 flex-1 flex items-center">
						<div className="flex-shrink-0">
							<img className="h-12 w-12 rounded-full" src={home.agent.profilePic} alt="" />
						</div>
						<div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
							<div>
								<div className="text-sm leading-5 font-medium text-indigo-600 truncate">
									{home.agent.displayName}
								</div>
								<div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
									<span className="truncate">
										{home.addressLineOne || 'No address provided'}
									</span>
								</div>
							</div>
							<div className="hidden md:block">
								<div>
									<div className="text-sm leading-5 text-gray-900">
										Created
										{' ' + moment.unix(home.createdAt.seconds).format('ddd Do,  h:mmA')}
									</div>
									{home.owner && (
										<div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
											<svg
												className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
											Raices property
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div>
						<svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
		</li>
	);
});
