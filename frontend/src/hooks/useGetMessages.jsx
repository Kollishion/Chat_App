import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessage,
  selectMessagesByConversationId,
} from "../redux/getMessagesSlice";

const useGetMessages = (conversationId) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.getMessagesSlice.loading);
  const messages = useSelector((state) =>
    selectMessagesByConversationId(state, conversationId)
  );

  useEffect(() => {
    if (conversationId && messages.length === 0) {
      dispatch(getMessage({ conversationId }));
    }
  }, [conversationId, dispatch, messages.length]);

  return { loading, messages };
};

export default useGetMessages;
