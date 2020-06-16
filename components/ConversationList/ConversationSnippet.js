import React from "react";

const ConversationSnippet = ({
  conversation: {
    id,
    lastMessage: { fromLead, content, timestamp },
    lead,
    agent,
  },
  setConversation,
  selected,
  user,
}) => {
  // less than 15 minutes response time green
  // 15 - 1 hour yellow
  // 1 hour + red
  let color = "yellow";
  let waitingTime = "";
  const d = new Date();
  const n = d.getTime();
  let timeWaitingMilliSeconds = n - timestamp.seconds * 1000;
  let timeWaitingSeconds = timeWaitingMilliSeconds / 1000;
  if (timeWaitingSeconds > 3600) {
    color = "red";
    let hours = Math.floor(timeWaitingSeconds / 3600);
    waitingTime = `Waiting over ${hours} hour${hours == 1 ? "" : "s"}`;
  } else if (timeWaitingSeconds < 900) {
    color = "green";
    waitingTime = `Waiting ${Math.round(timeWaitingSeconds / 60)} minutes`;
  } else {
    color = "yellow";
    waitingTime = `Waiting ${Math.round(timeWaitingSeconds / 60)} minutes`;
  }
  return (
    <div
      onClick={() => setConversation(id)}
      className="border-b border-gray-200 bg-white"
    >
      <div
        className={`${
          selected && "border-l-4 border-blue-500 bg-blue-100"
        } flex flex-col px-7 py-3 `}
      >
        <div className="flex sm:flex-col justify-between items-baseline">
          <span className="font-semibold truncate w-1/2">
            {user.type === "agent" ? lead.name : agent.name}
          </span>
          {/* {timeWaitingSeconds && fromLead && (
            <span className={`ml-3 sm:ml-0 text-sm text-${color}-400 truncate`}>
              {waitingTime}
            </span>
          )} */}
        </div>
        <span
          className={`${
            selected && "font-semibold text-gray-600"
          } truncate mt-1 text-gray-500`}
        >
          {content}
        </span>
      </div>
    </div>
  );
};
export default ConversationSnippet;
