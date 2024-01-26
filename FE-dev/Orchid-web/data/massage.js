import authorImg1 from "/public/static/images/message/u-1.png";
import authorImg2 from "/public/static/images/message/u-2.png";
import authorImg3 from "/public/static/images/message/u-3.png";
import authorImg4 from "/public/static/images/message/u-4.png";
import authorImg5 from "/public/static/images/message/u-5.png";
import authorImg6 from "/public/static/images/message/u-6.png";
import authorImg7 from "/public/static/images/message/u-7.png";
import authorImg8 from "/public/static/images/message/u-8.png";
import authorImg9 from "/public/static/images/message/u-9.png";

const pinnedMassages = [
  {
    id: 1,
    img: authorImg1,
    title: "Emilia Sam",
    massage: "Sent image",
    time: "16:14",
    isOnline: false,
    isTyping: false,
    status: "",
  },
  {
    id: 2,
    img: authorImg2,
    title: "Eleanor Pena",
    massage: "Sent Text",
    time: "16:14",
    isOnline: true,
    isTyping: true,
    status: "",
  },
  {
    id: 3,
    img: authorImg3,
    title: "Cody Fisher",
    massage: "Voice Message",
    time: "16:14",
    isOnline: true,
    isTyping: false,
    status: "",
  },
];

const allMassage = [
  {
    id: 1,
    img: authorImg4,
    title: "Marjorie",
    massage: "Good Luck",
    time: "15:11",
    status: "sent",
    isOnline: true,
    isTyping: false,
  },

  {
    id: 2,
    img: authorImg5,
    title: "Esther",
    massage: "missed_call",
    time: "12:24",
    status: "",
    isOnline: true,
    isTyping: false,
  },

  {
    id: 3,
    img: authorImg6,
    title: "Debra",
    massage: "Thank you",
    time: "16:14",
    status: "",
    isOnline: true,
    isTyping: true,
  },

  {
    id: 4,
    img: authorImg7,
    massage: "Voice Message",
    title: "Angel",
    time: "20:14",
    status: "seen",
    isOnline: false,
    isTyping: false,
  },

  {
    id: 5,
    img: authorImg8,
    title: "Cody",
    massage: "Voice Message",
    time: "16:11",
    status: "received",
    isOnline: true,
    isTyping: false,
  },

  {
    id: 6,
    img: authorImg9,
    title: "Soham",
    massage: "Voice Message",
    time: "10:14",
    status: "sent",
    isOnline: true,
    isTyping: false,
  },
];

export { pinnedMassages, allMassage };
