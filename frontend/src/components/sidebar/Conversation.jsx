import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/conversationSlice";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const dispatch = useDispatch();
  //To select the conversation of users and show the messages according to their id's
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversation
  );

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => dispatch(setSelectedConversation(conversation))}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
