import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Link, CircularProgress } from "@mui/material";
import { useTabResponsive } from "utils/tabResponsive";
import { useDispatch, useSelector } from "react-redux";
import { useSpinner } from "context/SpinnerProvider";
import { getStudentFees } from "features/student-pages/payments-page/services";
import PaymentCardStudent from "features/student-pages/payments-page/components/PaymentCard";
import CourseStudentDetails from "features/student-pages/payments-page/components/CourseDetails";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PaymentIcon from "assets/icons/datetimepayIcon";
import StatusIcon from "assets/icons/StatusIcon";
import ParkPayment from "assets/icons/ParkPaymentIcon";
import { selectStudentPayments, selectLoading } from "features/student-pages/payments-page/redux/selectors";

const PaymentStudentInterface = () => {
  const dispatch = useDispatch();
  const studentFees = useSelector(selectStudentPayments);
  const loading = useSelector(selectLoading);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  
  const [feesDataStudent, setFeesDataStudent] = useState({
    course_fees: 0,
    totalAmount: 0,
    pending_payment: 0,
    payment_status: "N/A",
    fees: [{ payment_method: "N/A" }],
  });

  useEffect(() => {
    const fetchStudentFee = async () => {
      showSpinner();
      try {
        const details = await getStudentFees({});
        setFeesDataStudent(details || {});
      } catch (error) {
        console.error("Error fetching student fees:", error);
      } finally {
        hideSpinner();
      }
    };
    fetchStudentFee();
  }, []);

  const paymentCardData = useMemo(
    () => [
      {
        id: 1,
        title: "Course Fees",
        amount: feesDataStudent.course_fees,
        icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
        style: { color: "#000000", bg: "#D7E7FF" },
      },
      {
        id: 2,
        title: "Amount Paid",
        amount: feesDataStudent.totalAmount,
        icon: <PaymentIcon color="primary" />,
        style: { color: "#009028", bg: "#D2FDD6" },
      },
      {
        id: 3,
        title: "Pending Payment",
        amount: feesDataStudent.pending_payment,
        icon: <PendingActionsOutlinedIcon sx={{ color: "#F00" }} />,
        style: { bg: "#FFDAD8" },
      },
      {
        id: 4,
        title: "Status",
        amount: feesDataStudent.payment_status,
        icon: <StatusIcon color="#606060" />,
        style: { color: "#000000", bg: "#E4E4E4" },
      },
      {
        id: 5,
        title: "Payment Method",
        amount: feesDataStudent.fees[0]?.payment_method || "N/A",
        icon: <ParkPayment color="#DF9300" />,
        style: { color: "#0D6EFD", bg: "#F9E8C7" },
      },
    ],
    [feesDataStudent]
  );

  return (
    <Box
      sx={{
        mx: tabView ? "0px" : "40px",
        mt: tabView ? "80px" : "40px",
        mb: "20px",
        borderRadius: "25px",
        boxShadow: tabView ? "none" : "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: "24px",
          padding: tabView ? "20px" : "40px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
          <Box sx={{ textAlign: "end" }}>
            <Typography
              variant="body1"
              component={Link}
              to="/student/tickets"
              sx={{
                color: "#0D6EFD",
                fontSize: "16px",
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              Raise A Ticket?
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#495057" }}>
              For any Queries, Please Raise your Ticket
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {paymentCardData.map((i) => (
                <PaymentCardStudent
                  title={i.title}
                  amount={i.amount}
                  icon={i.icon}
                  key={i.id}
                  style={i.style}
                />
              ))}
            </Box>
            <Box sx={{ mt: 4 }}>
              <CourseStudentDetails />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PaymentStudentInterface;
