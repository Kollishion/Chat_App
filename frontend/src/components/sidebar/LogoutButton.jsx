import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <div className="absolute sm:bottom-10 left-4 lg:bottom-10">
      <BiLogOut className="w-6 h-6 text-white cursor-pointer flex flex-col" />
    </div>
  );
};

export default LogoutButton;

//Starter Code
// import { BiLogOut } from "react-icons/bi";

// const LogoutButton = () => {
//   return (
//     <div className="absolute sm:bottom-10 left-4 lg:bottom-10">
//       <BiLogOut className="w-6 h-6 text-white cursor-pointer flex flex-col" />
//     </div>
//   );
// };

// export default LogoutButton;
