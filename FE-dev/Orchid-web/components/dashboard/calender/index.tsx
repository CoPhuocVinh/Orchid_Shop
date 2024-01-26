// "use client";
// import CalenderSelector from "../forms/CalenderSelector";
// import FullCalendar from "@fullcalendar/react";
// import daygridPlugin from "@fullcalendar/daygrid";

// // import Calendar from "react-calendar";

// function CalenderSm() {
//   return (
//     <div className="2xl:w-full lg:w-1/2 w-full rounded-lg bg-white dark:bg-darkblack-600 p-5">
//       <div className="w-full">
//         <p className="text-lg font-semibold text-bgray-900 dark:text-white mb-5">
//           Select Date
//         </p>
//         <CalenderSelector />
//         <div className="min-calender">
//           <FullCalendar
//             selectable={true}
//             plugins={[daygridPlugin]}
//             views={["dayGridDay"]}
//             headerToolbar={{
//               start: "",
//               center: "",
//               end: "",
//             }}
//             initialDate={new Date()} // using new Date(); and set your scheduled on event array
//             businessHours={true} // display business hours
//             editable={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CalenderSm;
