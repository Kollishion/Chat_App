import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  //Fetching loading and conversations from useGetConversations hook
  const { loading, conversations } = useGetConversations();
  const [useScroll, setUseScroll] = useState(true);
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversation
  );
  //State for only rendering the emojis of respective user beside their names only for once
  const [emojis, setEmojis] = useState({});

  useEffect(() => {
    if (conversations.length > 6) {
      setUseScroll(true);
    } else {
      setUseScroll(false);
    }
    const newEmojis = { ...emojis };

    let updated = false;
    conversations.forEach((convo) => {
      if (!newEmojis[convo._id]) {
        newEmojis[convo._id] = getRandomEmoji();
        updated = true;
      }
    });
    if (updated) {
      setEmojis(newEmojis);
    }
  }, [conversations, emojis]);

  return (
    <div
      className={`px-6 flex flex-col overflow-${
        useScroll ? "scroll" : "hidden"
      } absolute bottom-28`}
    >
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={emojis[conversation._id]}
          isSelected={selectedConversation === conversation._id}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
