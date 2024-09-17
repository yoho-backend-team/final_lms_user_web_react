import React, { useEffect } from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Divider,
  Card,
} from "@mui/material";
import { PaymentBg } from "utils/images";
import { useTabResponsive } from "utils/tabResponsive";
import { useDispatch, useSelector } from "react-redux";

import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import updateStudentFees from "features/student-pages/payments-page/redux/thunks";
import PaymentCardStudent from "features/student-pages/payments-page/components/PaymentCard";
import { selectStudentPayments ,selectLoading} from "features/student-pages/payments-page/redux/selectors";
import { getStudentFees } from "features/student-pages/payments-page/services";
import CourseStudentDetails from "features/student-pages/payments-page/components/CourseDetails";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EPFIcon from "assets/icons/EPFIcon";
import TaxIcon from "assets/icons/TaxIcon";
import SalaryInHandIcon from "assets/icons/salaryHandIcon";
import PaymentMethodIcon from "assets/icons/paymentMethodIcon";
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { Link } from "react-router-dom";
import PaymentIcon from "assets/icons/datetimepayIcon";
import StatusIcon from "assets/icons/StatusIcon";
import ParkPayment from "assets/icons/ParkPaymentIcon";



const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PaymentStudentInterface = () => {
  const dispatch = useDispatch();
  const Studentfess = useSelector(selectStudentPayments);
  const loading = useSelector(selectLoading);
  const { tabView } = useTabResponsive();
  const { showSpinner,hideSpinner } = useSpinner()
  const [feesDataStudent, setFeesDataStudent] = useState([{ fees: [], totalAmount: 0 }]);

   const instructorPaymentCardData = [
    {
      id: 1,
      title: "Course Fees",
      amount: feesDataStudent?.course_fees,
      icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
      style: { color: "#000000", bg: "#D7E7FF" },
    },
    {
      id: 2,
      title: "Amount Paid",
      amount: feesDataStudent?.totalAmount      ,
      icon: <PaymentIcon color="primary" />,
      style: { color: "#009028", bg: "#D2FDD6" },
    },
    {
      id: 3,
      title: "Pending Payment",
      amount: feesDataStudent?.pending_payment,
      icon: <PendingActionsOutlinedIcon sx={{color:"#F00" }}/>,
      style: {  bg: "#FFDAD8" },
    },
    {
      id: 4,
      title: "Status",
      amount: feesDataStudent?.payment_status,
      icon: <StatusIcon color="#606060" />,
      style: { color: "#000000", bg: "#E4E4E4" },
    },
    {
      id: 5,
      title: "Payment Method",
      amount: feesDataStudent?.fees?.[0]?.payment_method,
      icon: <ParkPayment color="#DF9300" />,
      style: { color: "#0D6EFD", bg: "#F9E8C7" },
    },
  ];

  useEffect(() => {
    const fetchStudentFee = async () => {
      const data = {};
      const details = await getStudentFees(data);
      setFeesDataStudent(details);
    };

    fetchStudentFee();
  }, []);

  // const getStudentfeesDetails = async () => {
  //   try {
  //     showSpinner()
  //     dispatch(getStudentFees()); 
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message)
  //   }finally{
  //     hideSpinner()
  //   }
  
  // };

  // useEffect(() => {
  //   getStudentfeesDetails();
  // }, [dispatch]);

console.log(feesDataStudent,"feesDataStudent")
  return (
    <>
      <Box
        sx={{
          mx: tabView ? "0px" : "40px",
          mt: tabView ? "80px" : "40px",
          mb: "20px",
          borderRadius: "25px",
          boxShadow: tabView ? "none" : "0px 0px 64px 0px rgba(0, 0, 0, 0.10);",
          
        }}
      >
        <Box
          sx={{
            backgroundColor:'white',
            width: "100%",
            borderRadius:'24px'
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: "40px",
              marginBottom: '-40px',
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#151010",
                  fontSize: "24px",
                  fontWeight: "700",
                  lineHeight: "32px",
                }}
              >
                Payment
              </Typography>
            </Box>
            <Box sx={{ textAlign: "end" }}>
              <Typography
                variant="body1"
                component={Link}
                to="/student/tickets"
                sx={{
                  color: "#0D6EFD",
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "22px",
                  textDecoration: "underline",
                }}
              >
                Raise A Ticket?
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#495057",
                  lineHeight: "24px",
                }}
              >
                For any Queries, Please Raise your Ticket
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              p: tabView ? "20px" : "40px",
              gap: "46px",
              flexWrap: "wrap",
            }}
          >
            {instructorPaymentCardData.map((i) => (
              <PaymentCardStudent
                title={i.title}
                amount={i.amount}
                icon={i.icon}
                key={i.title}
                style={i.style}
              />
            ))}
          </Box>
          <CourseStudentDetails />
        </Box>
      </Box>
    </>
  );
};

export default PaymentStudentInterface;
