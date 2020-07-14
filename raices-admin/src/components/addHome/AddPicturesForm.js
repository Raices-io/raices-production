import React from 'react';
import ImageUploader from '../ImageUploader/ImageUploader.js';

const AddPictureForm = () => {
	return (
		<form className="bg-white pt-20 flex flex-col flex-grow px-4  h-full overflow-y-hidden">
			<div className=" flex flex-col h-full flex-grow">
				<div className="flex flex-col h-full flex-grow overflow-hidden">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">Add some pictures</h3>
						<p className="mt-1 text-sm leading-5 text-gray-500">
							You can always change these later.
						</p>
					</div>
					<div className=" h-full flex flex-col flex-grow ">
						{/* Image Uploader */}
						<div className="sm:col-span-6 overflow-y-hidden">
							<ImageUploader />
						</div>
					</div>
				</div>
				<div className=" border-t border-gray-200 pt-5">
					<div className="flex justify-end">
						<span className="ml-3 inline-flex rounded-md shadow-sm">
							<button
								type="submit"
								className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
								Save
							</button>
						</span>
					</div>
				</div>
			</div>
		</form>
	);
};
export default AddPictureForm;
