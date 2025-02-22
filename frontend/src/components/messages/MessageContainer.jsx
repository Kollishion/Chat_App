import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/conversationSlice";
import { useEffect } from "react";

const MessageContainer = () => {
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSelectedConversation(null));
  }, [dispatch]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex gap-2">
            <span className="label-text text-gray-300">To:</span>
            <span className="text-gray-300 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {user.username}👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
