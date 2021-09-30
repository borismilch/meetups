import alco from "../assets/alco-meetup.jpg";
import meetup from "../assets/undraw_conference_speaker_6nt7.svg";
import iluminati from "../assets/illuminati.jpg";

export default [
  {
    title: "Demo meetup",
    img: meetup,
    author: "Demo human",
    location: "My house",
    date: "12-06-2021",
    organize: true,
    fating: false,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur distinctio ipsam iure amet consequuntur unde esse? Quae, ad praesentium. Facilis, reprehenderit! Pariatur maxime modi deserunt architecto eius dicta officiis!",
    events: [
      {
        start: "2/4/2010 1:30 PM",
        end: "2/4/2010 2:40 PM",
        title: "demo event",
        type: "start",
      },
    ],
  },
  {
    title: "ALco meetup",
    img: alco,
    author: "Marta Hryhoric",
    location: "School",
    date: "12-04-22",
    organize: false,
    fating: true,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur distinctio ipsam iure amet consequuntur unde esse? Quae, ad praesentium. Facilis, reprehenderit! Pariatur maxime modi deserunt architecto eius dicta officiis!",
    events: [{ time: "12-30", text: "ALCO BUH", title: "yeah", type: "party" }],
  },
  {
    title: "Збори массонів",
    img: iluminati,
    author: "Bill Gates",
    location: " ??? ",
    date: "12-04-19",
    organize: false,
    fating: false,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur distinctio ur maxime modi deserunt architecto eius dicta officiis!",
    events: [
      {
        time: "12-30",
        title: "Talking about Coronavirus",
        text: "kkkkk",
        type: "chating",
      },
      {
        time: "13-30",
        title: "Talking about Delta-virus",
        text: "",
        type: "chating",
      },
      {
        time: "14-30",
        title: "Talking about Alpha-Virus",
        text: "kkkkkkk",
        type: "chating",
      },
      {
        time: "15-30",
        title: "Talking about Gamma-virus",
        text: "",
        type: "end",
      },
    ],
  },
];
