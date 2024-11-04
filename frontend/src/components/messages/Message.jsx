import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  //accessing the user details from state.auth
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const currentUserProfilePic = user?.profilePic || "";

  //current logged in user
  const fromMe = message.senderId === userId;

  const formattedTime = extractTime(message.createdAt);
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversation
  );

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe
    ? currentUserProfilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  if (!message) {
    return <div>No messages available</div>;
  }

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePicture} alt="profile_pic" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-80 text-xs flex gap-1 items-center pb-5">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
