import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

import SalaryIcon from 'assets/icons/salaryIcon';
import EPFIcon from 'assets/icons/EPFIcon';
import TaxIcon from 'assets/icons/TaxIcon';
import SalaryInHandIcon from 'assets/icons/salaryHandIcon';
import PaymentMethodIcon from 'assets/icons/paymentMethodIcon';

export const instructorPaymentCardData = [
  { id: 1, title: "Course Fees", amount: "₹96,000", icon: <SalaryIcon color="#0D6EFD" />, style: { color: "#000000",bg:"#D7E7FF" } },
  { id: 2, title: "Amount Paid", amount: "₹86,000", icon: <EPFIcon color="#009028" />, style: { color: "#009028",bg:"#D2FDD6" } },
  { id: 3, title: "Pending Payment", amount: "₹16,000", icon: <TaxIcon color="#FF0000" />, style: { color: "#FF0000",bg:"#FFDAD8" } },
  { id: 4, title: "Status", amount: "1 month pending", icon: <SalaryInHandIcon color="#606060" />, style: { color: "#000000",bg:"#E4E4E4" } },
  { id: 5, title: "Payment Method", amount: "Online", icon: <PaymentMethodIcon color="#DF9300" />, style: { color: "#0D6EFD",bg:"#F9E8C7" } },
];
