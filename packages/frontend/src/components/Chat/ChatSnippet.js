import React from "react";
import Link from "next/link";
import moment from "moment";
const ChatSnippet = ({ id, img, name, content, lastDate }) => {
  return (
    <Link href={`/messaging/chat/${id}`}>
      <div className="mt-8 mb-4 flex">
        {/* Image */}
        <img src={img} className="ml-4 rounded-full h-10 w-10" />
        <div className="mx-4 w-full flex flex-col">
          <div className="flex w-full items-baseline">
            <span className="font-semibold">{name}</span>
            <span className="text-xs text-gray-500 ml-3">
              {moment().diff(moment.unix(lastDate.seconds)) < 0
                ? moment.unix(lastDate.seconds).format("ddd, h:mmA")
                : moment.unix(lastDate.seconds).format("h:mmA")}
            </span>
          </div>
          <div className="w-full font-normal text-gray-600">{content}</div>
        </div>
        {/*  */}
      </div>
    </Link>
  );
};

export default ChatSnippet;
