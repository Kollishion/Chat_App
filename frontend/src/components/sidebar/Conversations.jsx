import Conversation from "./Conversation";

const Conversations = () => {
  return (
    <div className="w-[44vh] h-[50vh] absolute lg:top-[17vh] sm:top-[15vh] left-[-18px] px-3 flex flex-col overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};
export default Conversations;

//Starter Code
// import Conversation from "./Conversation";

// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-clip absolute left-10 top-28">
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//     </div>
//   );
// };
// export default Conversations;
