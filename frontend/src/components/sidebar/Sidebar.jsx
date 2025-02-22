import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 px-4 py-5 flex flex-col">
      <SearchInput />
      <div className="divider px-3">
        <Conversations />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
