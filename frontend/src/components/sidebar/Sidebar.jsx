import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="w-[40vh] border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-4">
        <Conversations />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;

//Starter Code
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
//   return (
//     <div className="w-[40vh] border-r border-slate-500 p-4 flex flex-col">
//       <SearchInput />
//       <div className="divider px-4">
//         <Conversations />
//         <LogoutButton />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

