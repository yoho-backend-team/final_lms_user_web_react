// import React, { useEffect, useState } from 'react';
// import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import CourseLayout from 'features/instructor-pages/courses-page/components/courseLayout';
// import CurrentCourse from './CurrentCourse';
// import CompletedCourse from './CompletedCourse';
// import getAndUpdateCourseDetails from "features/instructor-pages/courses-page/redux/thunks";
// import { useDispatch, useSelector } from "react-redux";
// import { selectInstructorCourse } from "features/instructor-pages/courses-page/redux/selectors";
// import { useSpinner } from "context/SpinnerProvider";
// import toast from "react-hot-toast";

// const Mainpage = () => {

//   const [currentTab, setCurrentTab] = useState('1');
//   const dispatch = useDispatch();
//   const course = useSelector(selectInstructorCourse);
//   const { showSpinner,hideSpinner } = useSpinner()

//   const getCourseDetails = (data) => {
//     try {
//       showSpinner()
//       dispatch(getAndUpdateCourseDetails(data));     
//     } catch (error) {
//       toast.error(error?.message)
//     }finally{
//       hideSpinner()
//     }
   
//   };

//   console.log(course,"Allcourse")

//   useEffect(() => {
//     const data = {};
//     getCourseDetails(data);
//   }, [dispatch]);

//   const tabsList = [
//     { id: '1', title: 'Current Course' },
//     { id: '2', title: 'Completed Course' },
//   ];

//   return (
//     <CourseLayout>
//       <Grid item xs={12} spacing={2} sx={{ p: 6 }}>
//         <Box sx={{ display: 'flex' }}>
//           <Typography variant="body1">
//             <KeyboardBackspaceIcon sx={{ marginRight: '20px' }} />
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{
//               color: 'var(--Colour-Neutral-1, #000)',
//               fontFamily: '"Nunito Sans"',
//               fontSize: 20,
//               fontStyle: 'normal',
//               fontWeight: 800,
//               lineHeight: '24px',
//             }}
//           >
//             Course List & Details
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', p: 3 }}>
//           <Tabs
//             value={currentTab}
//             onChange={(e, value) => setCurrentTab(value)}
//             indicatorColor="primary"
//             sx={{
//               '& .MuiTabs-indicator': {
//                 backgroundColor: '#0D6EFD',
//               },
//               '& .MuiTab-root': {
//                 color: '#000000',
//                 fontSize: '16px',
//                 fontWeight: 500,
//               },
//               '& .Mui-selected': {
//                 color: '#0D6EFD',
//               },
//             }}
//           >
//             {tabsList.map((tab) => (
//               <Tab key={tab.id} value={tab.id} label={tab.title} />
//             ))}
//           </Tabs>
//         </Box>
//         {currentTab === '1' && <CurrentCourse />}
//         {currentTab === '2' && <CompletedCourse />}
//       </Grid>
//     </CourseLayout>
//   );
// };

// export default Mainpage;
