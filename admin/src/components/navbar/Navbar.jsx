import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://www.jing.fm/clipimg/full/398-3981675_avatar-for-login-form.png"
              alt=""
              className="avatar"
            />
          </div>
        </div>
        <div className="text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin panel</span>
        </Link>
        </div>
        <div className="smallscreen">
          <MenuIcon className="icon" onClick={() => { setToggleMenu(true) }} />
          {toggleMenu && (
            <div className="menu-items slide-bottom">
              <CloseIcon className="close" onClick={() => { setToggleMenu(false) }} />
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="item">
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link to="/kamars" style={{ textDecoration: "none" }}>
                <div className="item">
                  <span>Kamarlar</span>
                </div>
              </Link>
              <Link to="/calculator" style={{ textDecoration: "none" }}>
                <div className="item">
                  <span>Calculator</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
