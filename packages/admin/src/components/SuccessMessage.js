const SuccessMessage = ({ children }) => {
	return (
		<div className="rounded-md bg-green-100 p-4 mt-10 max-w-md">
			<div className="flex">
				<div className="flex-shrink-0">
					<svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-3">
					<p className="text-sm leading-5 font-medium text-green-800">{children}</p>
				</div>
			</div>
		</div>
	);
};

export default SuccessMessage;
