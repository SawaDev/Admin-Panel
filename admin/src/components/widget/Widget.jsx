import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import millify from "millify";

const Widget = ({ type, stats }) => {
  let dataa;
  
  const diff = 20;

  switch (type) {
    case "warehouse":
      dataa = {
        title: "WAREHOUSE",
        isMoney: false,
        link: "See all users",
        amount: stats[0]?.totalSoni,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "money_in_warehouse":
      dataa = {
        title: "MONEY IN WAREHOUSE",
        isMoney: false,
        link: "View all orders",
        amount: stats[0]?.totalMoney,

        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      dataa = {
        title: "MONTHLY EARNING",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      dataa = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dataa.title}</span>
        <span className="counter">
          {dataa.isMoney && "$"} {dataa?.amount}
        </span>
        <span className="link">{dataa.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon />
          {diff} % */}
        </div>
        {dataa.icon}
      </div>
    </div>
  );
};

export default Widget;
