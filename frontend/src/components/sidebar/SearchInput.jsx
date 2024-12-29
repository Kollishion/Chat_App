import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../redux/conversationSlice";
import useGetConversations from "../../hooks/useGetConversation";
import { BsThreeDotsVertical } from "react-icons/bs";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversations();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 2) {
      return toast.error("Search term must be at least 2 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch("");
    } else {
      toast.error("No such user found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
      <button type="button" className="btn btn-circle bg-sky-500 text-white">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button">
            <BsThreeDotsVertical className="w-6 h-6 outline-none" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Blocked Contacts</a>
            </li>
          </ul>
        </div>
      </button>
    </form>
  );
};

export default SearchInput;
