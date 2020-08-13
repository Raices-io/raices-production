import React, { Fragment } from 'react';
var moment = require('moment');

const Chat = ({ message }) => {
	const {
		from: { name, picture },
		content,
		timestamp,
	} = message;
	return (
		<Fragment>
			<div className="flex items-start mb-4 text-sm">
				<img src={picture} className="w-10 h-10 rounded rm-3" />
				<div className="pl-4 flex-1 overflow-hidden">
					<div>
						<span className="font-bold">{name}</span>
						<span className="text-gray-300 text-xs pl-2">
							{moment(timestamp.seconds * 1000).fromNow()}
						</span>
					</div>
					<p className="text-black leading-normal">{content}</p>
				</div>
			</div>
		</Fragment>
	);
};

export default Chat;
