import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

export const paymentCardData = [
  {
    id: 1,
    title: "Desired CTC",
    amount: "₹96,000",
    icon: <AccountBalanceWalletOutlinedIcon sx={{ color: "blue" }} />,
    style: { color: "#000000", bg: "#D7E7FF" },
  },
  {
    id: 2,
    title: "Amount Paid",
    amount: "₹86,000",
    icon: <CalendarMonthOutlinedIcon sx={{ color: "blue" }} />,
    style: { color: "#009028", bg: "#D2FDD6" },
  },
  {
    id: 3,
    title: "Tax",
    amount: "16,000",
    icon: <PendingActionsOutlinedIcon sx={{ color: "blue" }} />,
    style: { color: "#FF0000", bg: "#FFDAD8" },
  },
  {
    id: 4,
    title: "In Hand",
    amount: "1 month pending",
    icon: <RotateRightOutlinedIcon sx={{ color: "blue" }} />,
    style: { color: "#000000", bg: "#E4E4E4" },
  },
  {
    id: 5,
    title: "Payment Method",
    amount: "Online",
    icon: <PaymentsOutlinedIcon sx={{ color: "blue" }} />,
    style: { color: "#0D6EFD", bg: "#F9E8C7" },
  },
];
