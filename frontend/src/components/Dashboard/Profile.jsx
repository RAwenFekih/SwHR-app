import ProfileHeader from "./ProfileHeader";
import "./Profile.css";
import userImage from "../../assets/user.png";
import { PiGenderIntersexBold } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { BiSolidPlanet } from "react-icons/bi";

const informations = [
  {
    Sex: "Female",
    icon: <PiGenderIntersexBold />,
  },
  {
    Nationality: "Tunisian",
    icon: <BiSolidPlanet />,
  },
  {
    Age: "22 years old",
    icon: <GrUserManager />,
  },
];

const Profile = () => {
  return (
    <div className="profile">
      <ProfileHeader />

      <div className="user--profile">
        <div className="user--details">
          <img src={userImage} alt="" />
          <h3 className="username">Rawen Fekih</h3>
          <span className="profession">Employee</span>
        </div>
        <div className="user-informations">
          {informations.map((info) => (
            <div className="info">
              <div className="info--detail">
                <div className="info--cover">{info.icon}</div>
                <div className="info-name">
                  <h4 className="sex">{info.Sex}</h4>
                  <h4 className="nationality">{info.Nationality}</h4>
                  <h4 className="age">{info.Age}</h4>
                </div>
              </div>
              <div className="action">:</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
