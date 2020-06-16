import React, { Fragment } from 'react';
import Minimal from '../Buttons/Minimal';
const WizardProgressHeader = ({ percentage, title }) => {
	return (
		<Fragment>
			<div className="flex flex-grow justify-between px-4 items-center z-10 fixed top-0 bg-white w-screen h-15">
				<span className="text-gray-600">{title}</span>
				<Minimal text="Salir" link="/" />
			</div>

			<div className="z-10 fixed top-15 bg-gray-200 w-screen h-2">
				{/* The filler */}
				<div
					className={`
        ${percentage == 25 ? 'w-1/4' : ''}  
        ${percentage == 50 ? 'w-1/2' : ''} 
        ${percentage == 75 ? 'w-3/4' : ''}
        ${percentage == 100 ? 'w-full' : ''}
        bg-indigo-500 h-full grid gap-0`}></div>
			</div>
		</Fragment>
	);
};

export default WizardProgressHeader;
