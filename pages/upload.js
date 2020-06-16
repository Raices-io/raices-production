import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../util/auth.js';
import Uploader from '../components/ImageUploader/Uploader';

const Upload = () => {
	return (
		// <button onClick={() => login("google")}>Sign in with Google</button>
		<div class="relative flex flex-col w-screen h-full flex-grow bg-white overflow-y-scroll antialiased ">
			<div className=" flex flex-col overflow-y-scroll h-full flex-grow mx-0 flex-grow mt-8">
				<h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					Upload images
				</h2>
				<Uploader />
				<h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					Already uploaded
				</h2>
				{/* Any images already associated with the pending home */}
			</div>
		</div>
	);
};

export default Upload;
