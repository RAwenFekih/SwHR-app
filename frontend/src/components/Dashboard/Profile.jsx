import React from "react";
import ProfileHeader from "./ProfileHeader";
import "./Profile.css";
import userImage from "../../assets/user.png";
import { PiGenderIntersexBold } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { BiSolidPlanet } from "react-icons/bi";

const Profile = ({ user }) => {
  if (!user) {
    return <div>Loading profile...</div>;
  }

  const informations = [
    {
      label: 'female',
      icon: <PiGenderIntersexBold />,
    },
    {
      label: user.nationality,
      icon: <BiSolidPlanet />,
    },
    {
      label: `${user.age} years old`,
      icon: <GrUserManager />,
    },
  ];

  return (
    <div className="profile">
      <ProfileHeader />
      <div className="user--profile">
        <div className="user--details">
          <img src={userImage} alt="" />
          <h3 className="username">{user.name}</h3>
          <span className="profession">{user.role}</span>
        </div>
        <div className="user-informations">
          {informations.map((info, idx) => (
            <div key={idx} className="info">
              <div className="info--detail">
                <div className="info--cover">{info.icon}</div>
                <div className="info-name">
                  <h4>{info.label}</h4>
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
