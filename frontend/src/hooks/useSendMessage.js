import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/useMessageSlice";
import { getMessage } from "../redux/getMessagesSlice";

const useSendMessage = () => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversation
  );
  const loading = useSelector((state) => state.conversations.loading);

  const handleSendMessage = (message) => {
    if (!selectedConversation) {
      console.error("No conversation selected");
      return;
    }
    dispatch(
      sendMessage({ message, conversationId: selectedConversation._id })
    );
    dispatch(getMessage({ conversationId: selectedConversation._id }));
  };

  return { sendMessage: handleSendMessage, loading };
};

export default useSendMessage;
