import { BiLogOut } from "react-icons/bi";

const ProfileHeader = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="profile--header">
      <h2 className="header--title">Profile</h2>
      <div
        className="logout-button"
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <BiLogOut className="icon" />
      </div>
    </div>
  );
};

export default ProfileHeader;