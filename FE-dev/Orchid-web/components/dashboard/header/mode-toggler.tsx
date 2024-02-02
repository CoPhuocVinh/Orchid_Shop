// "use client";
// // import { ThemeContext } from "@/app/(dashboard)/layout";
// import { useTheme } from "next-themes";
// import { useContext, useEffect, useState } from "react";

// function ModeToggler() {
//   // const { theme, setTheme } = useContext(ThemeContext);

//   const {setTheme, theme} = useTheme()
//   console.log(theme)
//   const toggleMode = () => {
//     if (theme === "dark") {
//       setTheme("");
//       localStorage.setItem("theme", "");
//     } else {
//       setTheme("dark");
//       localStorage.setItem("theme", "dark");
//     }
//   };

//   useEffect(() => {
//     if (
//       localStorage.getItem("theme") !== "" &&
//       localStorage.getItem("theme") !== "dark"
//     ) {
//       localStorage.setItem("theme", "");
//     }
//     // document.querySelector("html").classList = theme;
//     const classList = document.querySelector("html")!.classList;

//     if (theme) {
//       classList.value = theme;
//     }
//   }, [theme]);

//   return (
//     <button
//       aria-label="none"
//       type="button"
//       id="theme-toggle"
//       onClick={toggleMode}
//       className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-success-300 dark:border-darkblack-400"
//     >
//       <span className="block dark:hidden">
//         <svg
//           className="stroke-bgray-900"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M18.3284 14.8687C13.249 14.8687 9.13135 10.751 9.13135 5.67163C9.13135 4.74246 9.26914 3.84548 9.5254 3C5.74897 4.14461 3 7.65276 3 11.803C3 16.8824 7.11765 21 12.197 21C16.3472 21 19.8554 18.251 21 14.4746C20.1545 14.7309 19.2575 14.8687 18.3284 14.8687Z"
//             strokeWidth="1.5"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </span>
//       <span className="hidden dark:block">
//         <svg
//           className="stroke-bgray-900 dark:stroke-bgray-50"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
//           <path d="M12 2V4" strokeWidth="1.5" strokeLinecap="round" />
//           <path d="M12 20V22" strokeWidth="1.5" strokeLinecap="round" />
//           <path
//             d="M20.6602 7L18.9281 8"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//           />
//           <path
//             d="M5.07178 16L3.33973 17"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//           />
//           <path
//             d="M3.33984 7L5.07189 8"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//           />
//           <path
//             d="M18.9282 16L20.6603 17"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//           />
//         </svg>
//       </span>
//     </button>
//   );
// }

// export default ModeToggler;
