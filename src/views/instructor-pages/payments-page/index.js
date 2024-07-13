import React, { useEffect } from "react";
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
import { instructorPaymentCardData } from "data/instructor";
import PaymentCard from "features/instructor-pages/payments-page/components/paymentCard";
import { PaymentBg } from "utils/images";
import SalaryDetailsTable from "features/instructor-pages/payments-page/components/salaryTable";
import { useTabResponsive } from "utils/tabResponsive";
import updateStaffSalaries from "features/instructor-pages/payments-page/redux/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstructorPayments,
  selectLoading,
} from "features/instructor-pages/payments-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";

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

const PaymentInterface = () => {
  const dispatch = useDispatch();
  const salaries = useSelector(selectInstructorPayments);
  const loading = useSelector(selectLoading);
  const { tabView } = useTabResponsive();
  const { showSpinner,hideSpinner } = useSpinner()

  const getSalaryDetails = async () => {
    try {
      showSpinner()
      dispatch(updateStaffSalaries()); 
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }finally{
      hideSpinner()
    }
  
  };

  useEffect(() => {
    getSalaryDetails();
  }, [dispatch]);
  console.log(salaries, "salaries");

  
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
            backgroundImage: `url(${PaymentBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: "40px",
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
              <PaymentCard
                title={i.title}
                amount={i.amount}
                icon={i.icon}
                key={i.title}
                style={i.style}
              />
            ))}
          </Box>
          <SalaryDetailsTable data={ salaries } months={months} />
        </Box>
      </Box>
    </>
  );
};

export default PaymentInterface;
