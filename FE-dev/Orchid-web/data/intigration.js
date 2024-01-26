import dropbox from "/public/static/images/integrations/dropbox.svg";
import facebook from "/public/static/images/integrations/facebook.svg";
import googleMeet from "/public/static/images/integrations/google_meet.svg";
import mailChimo from "/public/static/images/integrations/mailchimp.svg";
import msExcel from "/public/static/images/integrations/ms_excel.svg";
import slack from "/public/static/images/integrations/slack.svg";
import stackOverflow from "/public/static/images/integrations/stack_overflow.svg";
import tikTok from "/public/static/images/integrations/tik-tok.svg";
import trello from "/public/static/images/integrations/trello.svg";
import twitter from "/public/static/images/integrations/twitter.svg";
import wordpress from "/public/static/images/integrations/wordpress.svg";
import youtube from "/public/static/images/integrations/youtube.svg";

const integrations = [
  {
    id: 1,
    img: stackOverflow,
    title: "Stack Overflow",
    category: "Social",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 2,
    img: msExcel,
    title: "Microsoft Excel",
    category: "Analitycs",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "disconnect",
  },
  {
    id: 3,
    img: trello,
    title: "Trello",
    category: "Management",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "disconnect",
  },
  {
    id: 4,
    img: mailChimo,
    title: "Mail Chimp",
    category: "Business",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "disconnect",
  },
  {
    id: 5,
    img: slack,
    title: "Slack",
    category: "Social",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 6,
    img: googleMeet,
    title: "Google Meet",
    category: "Management",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 7,
    img: dropbox,
    title: "Drop Box",
    category: "Business",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 8,
    img: wordpress,
    title: "Wordpress",
    category: "Business",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 9,
    img: facebook,
    title: "Facebook",
    category: "Social",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 10,
    img: twitter,
    title: "Twitter",
    category: "Social",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 11,
    img: youtube,
    title: "Youtube",
    category: "Entertainment",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
  {
    id: 12,
    img: tikTok,
    title: "TikTok",
    category: "Entertainment",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    status: "connect",
  },
];

export default integrations;
