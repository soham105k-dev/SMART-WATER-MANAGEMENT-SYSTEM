import { IoIosNotificationsOutline } from "react-icons/io";
import "./Header.css";


const Header = () => {
  return (
    <header className="header">
    <div className="header-container">
        <div className="header-left">
            <h1 className="header-title">Smart Water Pressure Management System</h1>
            <p className="header-subtitle">Solapur Municipal Corporation</p>
        </div>
        <div className="header-right">
            <div className="user-status">
                <IoIosNotificationsOutline className="notification-icon" />
                <h2>Admin</h2>
            </div>
        </div>
    </div>
    </header>
  );
}

export default Header;