import { useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";

const Messages = () => {
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversation
  );

  const { loading, messages } = useGetMessages(selectedConversation?._id);

  const lastMessageRef = useRef();

  // Automatically scroll to the last message whenever messages change
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        // Display loading skeletons if messages are still loading
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length === 0 ? (
        // Display prompt if there are no messages yet
        <p className="text-center">Enter a message to start the conversation</p>
      ) : (
        // Map through messages and apply the scroll ref only to the last message
        messages.map((msg, index) => (
          <div
            key={`${msg._id}-${index}`}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={msg} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
