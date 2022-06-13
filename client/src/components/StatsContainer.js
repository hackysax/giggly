import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/StatsContainer";
import { MdOutlinePending, MdOutlineCancel } from "react-icons/md";
import { BsCalendar2Check, BsCheck2Circle } from "react-icons/bs";
import StatItem from "./StatItem";

const StatsContainer = () => {
  const { statsStatus, statsGenre } = useAppContext();
  //define status types here...
  //four different statuses

  const frontStatuses = [
    {
      title: "Gigs Requested",
      value: statsStatus.Requested,
      icon: <MdOutlinePending />,
    },
    {
      title: "Gigs Booked",
      value: statsStatus.Booked,
      icon: <BsCalendar2Check />,
    },
    {
      title: "Gigs Completed",
      value: statsStatus.Completed,
      icon: <BsCheck2Circle />,
    },
    {
      title: "Gigs Canceled",
      value: statsStatus.Canceled,
      icon: <MdOutlineCancel />,
    },
  ];
  //TODO:
  //define genre design here
  //six different genres

  return (
    <Wrapper>
      {frontStatuses.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
