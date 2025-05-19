import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { useSpinner } from 'context/SpinnerProvider';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import getAllReports from '../redux/thunks';
import { selectStudentDashboard } from '../redux/selectors';



const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginBottom: '10px',
});

const StatusBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '10px',
});

const StatusItem = styled(Box)(({ theme, bgColor }) => ({
    backgroundColor: bgColor,
    borderRadius: '50%',
    width: '130px',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    [theme.breakpoints.up('sm')]: {
      width: '150px',
      height: '150px',
    },
  }));

const TicketStatusCard = ({tabView}) => {

  const GradientCard = styled(Card)(({ theme }) => ({
    borderRadius: '8px',
    border: '1px solid #CB89E2',
    background: 'linear-gradient(106deg, #F1D2FD 36%, #FFE2AB 100%)',
    boxShadow: '0px 0px 63px 0px rgba(0, 0, 0, 0.10)',
    width: tabView? '350px' :'100%', 
    // maxWidth: '464px',  
    height: '150px',
    marginTop: '25px',
    padding: '5px',
    [theme.breakpoints.up('sm')]: {
      padding: '10px', 
    },
  }));
  
  const dispatch = useDispatch()
  const reports = useSelector(selectStudentDashboard); 
  const { showSpinner, hideSpinner } = useSpinner()


  const fetchReports = async () => {
    try {
      showSpinner();
      await dispatch(getAllReports());
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };
  
  useEffect(() => {
    fetchReports();
  }, [dispatch]);
 




  return (
    <GradientCard>
      <CardContent>
        <Header>
          <Typography variant="h6" component="div" sx={{
            fontWeight: 900,
            color: 'black',
            textAlign: 'center',
            fontFamily: "Nunito Sans",
            fontSize: '20px',
            fontStyle: 'normal',
            lineHeight: 'normal'
          }}>
            Ticket
          </Typography>
          <Typography variant="body2" component="div" sx={{
            fontFamily: "Nunito Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            letterSpacing: '-0.3px',
            color: '#454545'
          }}>
            Total  {reports?.tickets?.total} Ticket Raised
          </Typography>
        </Header>
        <StatusBox>
          <StatusItem bgColor="#A7F3D0">
            <Typography variant="h3" component="div" sx={{
              fontWeight: 700,
              color: '#29AA92',
              textAlign: 'center',
              fontFamily: "Barlow Condensed",
              fontSize: '40px',
              margin: '-35px'
            }}>
              {reports?.tickets?.closed}              
            </Typography>
            <Typography variant="body1" component="div" sx={{
              color: '#317064',
              textAlign: 'center',
              fontFamily: "Nunito Sans",
              fontSize: '14px',
              fontWeight: 700,
              margin: '30px'
            }}>
              Completed
            </Typography>
          </StatusItem>
          <StatusItem bgColor="#FECACA">
            <Typography variant="h3" component="div" sx={{
              fontWeight: 700,
              color: '#FF1B1B',
              textAlign: 'center',
              fontFamily: "Barlow Condensed",
              fontSize: '40px',
              margin: '-35px'
            }}>
               {reports?.tickets?.opened}  
            </Typography>
            <Typography variant="body1" component="div" sx={{
              color: '#954444',
              textAlign: 'center',
              fontFamily: "Nunito Sans",
              fontSize: '14px',
              fontWeight: 700,
              margin: '30px'
            }}>
              Pending
            </Typography>
          </StatusItem>
        </StatusBox>
      </CardContent>
    </GradientCard>
  );
};

export default TicketStatusCard;
