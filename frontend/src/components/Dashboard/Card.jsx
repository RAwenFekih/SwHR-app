import { IoDocuments } from "react-icons/io5";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";

const courses = (userRole) => [
  { title: "My Documents", icon: <IoDocuments /> },
  {
    title: "My Requests",
    duration: "2 Hours",
    icon: <IoGitPullRequestSharp />,
  },
  {
    title: "My Performance",
    duration: "2 Hours",
    icon: <GrDocumentPerformance />,
  },
  ...(userRole === "hr"
    ? [
        {
          title: "Manage Employees",
          duration: "2 Hours",
          icon: <MdManageAccounts />,
        },
      ]
    : []),
];

const Card = ({ selectedCard, onCardClick, userRole }) => {
  return (
    <div className="card--container">
      {courses(userRole).map((item) => (
        <div
          key={item.title}
          className={`card${selectedCard === item.title ? " selected" : ""}`}
          onClick={() => onCardClick(item.title)}
          style={{ cursor: "pointer" }}
        >
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
