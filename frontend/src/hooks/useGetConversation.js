import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from "../redux/conversationSlice";

const useGetConversations = () => {
  const dispatch = useDispatch();

  // Select conversation data and status from Redux
  const conversations = useSelector(
    (state) => state.conversations.conversations
  );
  const status = useSelector((state) => state.conversations.status);
  const error = useSelector((state) => state.conversations.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchConversation());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "failed" && error) {
      console.error(error);
    }
  }, [status, error]);

  return { loading: status === "loading", conversations };
};

export default useGetConversations;
