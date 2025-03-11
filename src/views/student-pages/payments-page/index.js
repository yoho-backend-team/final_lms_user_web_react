// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Link,
// } from "@mui/material";
// import { useTabResponsive } from "utils/tabResponsive";
// import { useDispatch, useSelector } from "react-redux";
// import { useSpinner } from "context/SpinnerProvider";
// import { getStudentFees } from "features/student-pages/payments-page/services";
// import PaymentCardStudent from "features/student-pages/payments-page/components/PaymentCard";
// import CourseStudentDetails from "features/student-pages/payments-page/components/CourseDetails";
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
// import PaymentIcon from "assets/icons/datetimepayIcon";
// import StatusIcon from "assets/icons/StatusIcon";
// import ParkPayment from "assets/icons/ParkPaymentIcon";
// import student from "assets/images/background/student.png";
// import { selectStudentPayments, selectLoading } from "features/student-pages/payments-page/redux/selectors";

// const PaymentStudentInterface = () => {
//   const dispatch = useDispatch();
//   const Studentfess = useSelector(selectStudentPayments);
//   const loading = useSelector(selectLoading);
//   const { tabView } = useTabResponsive();
//   const { showSpinner, hideSpinner } = useSpinner();
//   const [feesDataStudent, setFeesDataStudent] = useState([{ fees: [], totalAmount: 0 }]);

//   const instructorPaymentCardData = [
//     {
//       id: 1,
//       title: "Course Fees",
//       amount: feesDataStudent?.course_fees,
//       icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
//       style: { color: "#000000", bg: "#D7E7FF" },
//     },
//     {
//       id: 2,
//       title: "Amount Paid",
//       amount: feesDataStudent?.totalAmount,
//       icon: <PaymentIcon color="primary" />,
//       style: { color: "#009028", bg: "#D2FDD6" },
//     },
//     {
//       id: 3,
//       title: "Pending Payment",
//       amount: feesDataStudent?.pending_payment,
//       icon: <PendingActionsOutlinedIcon sx={{ color: "#F00" }} />,
//       style: { bg: "#FFDAD8" },
//     },
//     {
//       id: 4,
//       title: "Status",
//       amount: feesDataStudent?.payment_status,
//       icon: <StatusIcon color="#606060" />,
//       style: { color: "#000000", bg: "#E4E4E4" },
//     },
//     {
//       id: 5,
//       title: "Payment Method",
//       amount: feesDataStudent?.fees?.[0]?.payment_method,
//       icon: <ParkPayment color="#DF9300" />,
//       style: { color: "#0D6EFD", bg: "#F9E8C7" },
//     },
//   ];

//   useEffect(() => {
//     const fetchStudentFee = async () => {
//       const data = {};
//       const details = await getStudentFees(data);
//       setFeesDataStudent(details);
//     };

//     fetchStudentFee();
//   }, []);

//   return (
//     <>
//       <Box
//         sx={{
  
//           mx: tabView ? "0px" : "40px",
//           mt: tabView ? "80px" : "40px",
//           mb: "20px",
//           borderRadius: "25px",
//           boxShadow: tabView ? "none" : "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
//         }}
//       >
//         <Box
//           sx={{
//             backgroundImage: `url("student.png")`,
           
//             backgroundColor: 'white',
//             width: "100%",
//             borderRadius: '24px',
//             padding: tabView ? "20px" : "40px",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               mb: 2,
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#151010",
//                 fontSize: "24px",
//                 fontWeight: "700",
//                 lineHeight: "32px",
//               }}
//             >
//               Payment
//             </Typography>
//             <Box sx={{ textAlign: "end" }}>
//               <Typography
//                 variant="body1"
//                 component={Link}
//                 to="/student/tickets"
//                 sx={{
//                   color: "#0D6EFD",
//                   fontSize: "16px",
//                   fontWeight: "700",
//                   lineHeight: "22px",
//                   textDecoration: "underline",
//                 }}
//               >
//                 Raise A Ticket?
//               </Typography>
//               <Typography
//                 sx={{
//                   fontSize: "12px",
//                   fontWeight: "400",
//                   color: "#495057",
//                   lineHeight: "24px",
//                 }}
//               >
//                 For any Queries, Please Raise your Ticket
//               </Typography>
//             </Box>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               gap: "20px",
//               flexWrap: "wrap",
//               justifyContent: "space-between",
//             }}
//           >
//             {instructorPaymentCardData.map((i) => (
//               <PaymentCardStudent
//                 title={i.title}
//                 amount={i.amount}
//                 icon={i.icon}
//                 key={i.title}
//                 style={i.style}
//               />
//             ))}
//           </Box>
//           <Box sx={{ mt: 4 }}>
//             <CourseStudentDetails />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default PaymentStudentInterface;
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Link,
// } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom"; // Import RouterLink for navigation
// import { useTabResponsive } from "utils/tabResponsive";
// import { useDispatch, useSelector } from "react-redux";
// import { useSpinner } from "context/SpinnerProvider";
// import { getStudentFees } from "features/student-pages/payments-page/services";
// import PaymentCardStudent from "features/student-pages/payments-page/components/PaymentCard";
// import CourseStudentDetails from "features/student-pages/payments-page/components/CourseDetails";
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
// import PaymentIcon from "assets/icons/datetimepayIcon";
// import StatusIcon from "assets/icons/StatusIcon";
// import ParkPayment from "assets/icons/ParkPaymentIcon";
// import { selectStudentPayments, selectLoading } from "features/student-pages/payments-page/redux/selectors";
// import Joyride from 'react-joyride';

// const PaymentStudentInterface = () => {
//   const dispatch = useDispatch();
//   const studentFees = useSelector(selectStudentPayments);
//   const loading = useSelector(selectLoading);
//   const { tabView } = useTabResponsive();
//   const { showSpinner, hideSpinner } = useSpinner();

//   const [feesDataStudent, setFeesDataStudent] = useState({ fees: [], totalAmount: 0 });

//   useEffect(() => {
//     const fetchStudentFee = async () => {
//       showSpinner();
//       try {
//         const data = {};
//         const details = await getStudentFees(data);
//         setFeesDataStudent(details || { fees: [], totalAmount: 0 });
//       } catch (error) {
//         console.error("Error fetching student fees:", error);
//       } finally {
//         hideSpinner();
//       }
//     };

//     fetchStudentFee();
//   }, []);

//   const [feesDataStudent, setFeesDataStudent] = useState([{ fees: [], totalAmount: 0 }]);
//   const [runTour, setRunTour] = useState(true); // State to control the tour


//   const instructorPaymentCardData = [
//     {
//       id: 1,
//       title: "Course Fees",
//       amount: feesDataStudent?.course_fees || "N/A",
//       icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
//       style: { color: "#000000", bg: "#D7E7FF" },
//     },
//     {
//       id: 2,
//       title: "Amount Paid",
//       amount: feesDataStudent?.totalAmount || "N/A",
//       icon: <PaymentIcon color="primary" />,
//       style: { color: "#009028", bg: "#D2FDD6" },
//     },
//     {
//       id: 3,
//       title: "Pending Payment",
//       amount: feesDataStudent?.pending_payment || "N/A",
//       icon: <PendingActionsOutlinedIcon sx={{ color: "#F00" }} />,
//       style: { bg: "#FFDAD8" },
//     },
//     {
//       id: 4,
//       title: "Status",
//       amount: feesDataStudent?.payment_status || "N/A",
//       icon: <StatusIcon color="#606060" />,
//       style: { color: "#000000", bg: "#E4E4E4" },
//     },
//     {
//       id: 5,
//       title: "Payment Method",
//       amount: feesDataStudent?.fees?.[0]?.payment_method || "N/A",
//       icon: <ParkPayment color="#DF9300" />,
//       style: { color: "#0D6EFD", bg: "#F9E8C7" },
//     },
//   ];


//   return (
//     <Box
//       sx={{
//         mx: tabView ? "0px" : "40px",
//         mt: tabView ? "80px" : "40px",
//         mb: "20px",
//         borderRadius: "25px",
//         boxShadow: tabView ? "none" : "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
        
//       }}
//     >

//   const steps = [
//     {
//       target: '.payment-title',
//       content: 'This is where you can see your payment details.',
//       disableBeacon:true
//     },
//     {
//       target: '.payment-card',
//       content: 'Here are your payment cards with detailed information.',
//       disableBeacon:true,
//     },
//     {
//       target: '.raise-ticket',
//       content: 'If you have any queries, you can raise a ticket here.',
//       disableBeacon:true
//     },
//   ];

//   useEffect(() => {
//     const fetchStudentFee = async () => {
//       const data = {};
//       const details = await getStudentFees(data);
//       setFeesDataStudent(details);
//     };

//     fetchStudentFee();
//   }, []);

//   return (
//     <>
//       <Joyride
//         steps={steps}
//         run={runTour} // Automatically start the tour
//         continuous
//         showSkipButton
//         disableBeacon
//         disableScrolling
//         styles={{ options: { zIndex: 10000 } }}
        
//         callback={(data) => {
//           const { status } = data;
//           if (status === 'finished' || status === 'skipped') {
//             setRunTour(false);
//           }
//         }}
//       />

//       <Box
//         sx={{
//           backgroundColor: "white",
//           width: "100%",
//           borderRadius: "24px",
//           padding: tabView ? "20px" : "40px",
//           backgroundImage: `url(${require("assets/images/background/student.png")})`, // Properly loading image
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             mb: 2,
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#151010",
//               fontSize: "24px",
//               fontWeight: "700",
//               lineHeight: "32px",
//             }}
//           >
//             Payment
//           </Typography>
//           <Box sx={{ textAlign: "end" }}>
//             <Typography

//               variant="body1"
//               component={RouterLink}
//               to="/student/tickets"

//               className="payment-title"

//               sx={{
//                 color: "#0D6EFD",
//                 fontSize: "16px",
//                 fontWeight: "700",
//                 lineHeight: "22px",
//                 textDecoration: "underline",
//               }}
//             >
//               Raise A Ticket?
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: "12px",
//                 fontWeight: "400",
//                 color: "#495057",
//                 lineHeight: "24px",
//               }}
//             >
//               For any Queries, Please Raise your Ticket
//             </Typography>


//             <Box sx={{ textAlign: "end" }}>
//               <Typography
//                 variant="body1"
//                 component={Link}
//                 to="/student/tickets"
//                 className="raise-ticket"
//                 sx={{
//                   color: "#0D6EFD",
//                   fontSize: "16px",
//                   fontWeight: "700",
//                   lineHeight: "22px",
//                   textDecoration: "underline",
//                 }}
//               >
//                 Raise A Ticket?
//               </Typography>
//               <Typography
//                 sx={{
//                   fontSize: "12px",
//                   fontWeight: "400",
//                   color: "#495057",
//                   lineHeight: "24px",
//                 }}
//               >
//                 For any Queries, Please Raise your Ticket
//               </Typography>
//             </Box>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               gap: "20px",
//               flexWrap: "wrap",
//               justifyContent: "space-between",
//             }}
//           >
//             {instructorPaymentCardData.map((i) => (
//               <PaymentCardStudent
//                 title={i.title}
//                 amount={i.amount}
//                 icon={i.icon}
//                 key={i.title}
//                 style={i.style}
//                 className="payment-card"
//               />
//             ))}
//           </Box>
//           <Box sx={{ mt: 4 }}>
//             <CourseStudentDetails />

//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             gap: "20px",
//             flexWrap: "wrap",
//             justifyContent: "space-between",
//           }}
//         >
//           {instructorPaymentCardData.map((card) => (
//             <PaymentCardStudent
//               key={card.id}
//               title={card.title}
//               amount={card.amount}
//               icon={card.icon}
//               style={card.style}
//             />
//           ))}
//         </Box>

//         <Box sx={{ mt: 4 }}>
//           <CourseStudentDetails />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default PaymentStudentInterface;
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTabResponsive } from "utils/tabResponsive";
import { useDispatch, useSelector } from "react-redux";
import { useSpinner } from "context/SpinnerProvider";
import { getStudentFees } from "features/student-pages/payments-page/services";
import PaymentCardStudent from "features/student-pages/payments-page/components/PaymentCard";
import CourseStudentDetails from "features/student-pages/payments-page/components/CourseDetails";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import PaymentIcon from "assets/icons/datetimepayIcon";
import StatusIcon from "assets/icons/StatusIcon";
import ParkPayment from "assets/icons/ParkPaymentIcon";
import { selectStudentPayments, selectLoading } from "features/student-pages/payments-page/redux/selectors";
import Joyride from 'react-joyride';

const PaymentStudentInterface = () => {
  const dispatch = useDispatch();
  const studentFees = useSelector(selectStudentPayments);
  const loading = useSelector(selectLoading);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const [feesDataStudent, setFeesDataStudent] = useState({ fees: [], totalAmount: 0 });
  const [runTour, setRunTour] = useState(true);

  useEffect(() => {
    const fetchStudentFee = async () => {
      showSpinner();
      try {
        const details = await getStudentFees({});
        setFeesDataStudent(details || { fees: [], totalAmount: 0 });
      } catch (error) {
        console.error("Error fetching student fees:", error);
      } finally {
        hideSpinner();
      }
    };
    fetchStudentFee();
  }, []);

  const instructorPaymentCardData = [
    { id: 1, title: "Course Fees", amount: feesDataStudent?.course_fees || "N/A", icon: <AccountBalanceWalletOutlinedIcon color="primary" />, style: { color: "#000000", bg: "#D7E7FF" } },
    { id: 2, title: "Amount Paid", amount: feesDataStudent?.totalAmount || "N/A", icon: <PaymentIcon color="primary" />, style: { color: "#009028", bg: "#D2FDD6" } },
    { id: 3, title: "Pending Payment", amount: feesDataStudent?.pending_payment || "N/A", icon: <PendingActionsOutlinedIcon sx={{ color: "#F00" }} />, style: { bg: "#FFDAD8" } },
    { id: 4, title: "Status", amount: feesDataStudent?.payment_status || "N/A", icon: <StatusIcon color="#606060" />, style: { color: "#000000", bg: "#E4E4E4" } },
    { id: 5, title: "Payment Method", amount: feesDataStudent?.fees?.[0]?.payment_method || "N/A", icon: <ParkPayment color="#DF9300" />, style: { color: "#0D6EFD", bg: "#F9E8C7" } },
  ];

  const steps = [
    { target: '.payment-title', content: 'This is where you can see your payment details.', disableBeacon: true },
    { target: '.payment-card', content: 'Here are your payment cards with detailed information.', disableBeacon: true },
    { target: '.raise-ticket', content: 'If you have any queries, you can raise a ticket here.', disableBeacon: true },
  ];

  return (
    <>
      {/* <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        disableBeacon
        disableScrolling
        styles={{ options: { zIndex: 10000 } }}
        callback={({ status }) => {
          if (status === 'finished' || status === 'skipped') setRunTour(false);
        }}
      /> */}

      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: "24px",
          padding: tabView ? "20px" : "40px",
          backgroundImage: `url(${require("assets/images/background/student.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ color: "#151010", fontSize: "24px", fontWeight: "700", lineHeight: "32px" }}>
            Payment
          </Typography>
          <Box sx={{ textAlign: "end" }}>
            <Typography component={RouterLink} to="/student/tickets" className="raise-ticket" sx={{ color: "#0D6EFD", fontSize: "16px", fontWeight: "700", lineHeight: "22px", textDecoration: "underline" }}>
              Raise A Ticket?
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#495057", lineHeight: "24px" }}>
              For any Queries, Please Raise your Ticket
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-between" }}>
          {instructorPaymentCardData.map((card) => (
            <PaymentCardStudent key={card.id} title={card.title} amount={card.amount} icon={card.icon} style={card.style} className="payment-card" />
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <CourseStudentDetails />
        </Box>
      </Box>
    </>
  );
};

export default PaymentStudentInterface;