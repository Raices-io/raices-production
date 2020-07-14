import React from 'react';

const BottomFloatingSeeButton = ({ agent, messageAgent }) => {
	return (
		<div className="flex fixed bottom-0 justify-center w-full h-16 z-10 bg-white border-t border-gray-200 items-center">
			{' '}
			<div className="flex max-w-3xl w-full h-full items-center py-4">
				<div className="min-w-0 flex-1 flex items-center">
					{/* Profile Image */}
					<div className="flex-shrink-0">
						<img className="h-12 w-12 rounded-full" src={agent.profilePic} alt="" />
					</div>
					{/* Agent Name */}
					<div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
						<div>
							<div className="text-sm leading-5 font-medium text-indigo-600 truncate">
								Showing agent: {agent.displayName}
							</div>
							{agent.company && (
								<div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
									<span className="truncate">{agent.company}</span>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="">
					<button
						onClick={messageAgent}
						className="block w-full sm:w-auto sm:inline-block bg-indigo-500 text-white hover:bg-indigo-400 font-semibold px-4 py-2 rounded-lg xl:block xl:w-full">
						See House
					</button>
				</div>
			</div>
		</div>
	);
};

export default BottomFloatingSeeButton;
