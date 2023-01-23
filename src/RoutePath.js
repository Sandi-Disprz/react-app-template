import CalenderRight from "./components/Calender/CalenderRight/CalenderRight";
import AgendaRange from "./components/Calender/RangeAgenda/AgendaRange";
export const VIEWBUTTONS = [
  {
    text: "Day",
    path: "/",
  },
  {
    text: "For Month",
    path: "agenda-view",
  },
];

export const VIEWPATH = [
  {
    path: "/",
    component: <CalenderRight />,
  },
  {
    path: "agenda-view",
    component: <AgendaRange />,
  },
];
