import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Payment from './Payment';
import Success from './Success';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, rgb(0,102,204) 0%, rgb(102,204,0) 50%, rgb(0,204,102) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, rgb(102,204,0) 0%, rgb(0,204,102) 50%, rgb(0,102,204) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active
    ? '#0D6EFD'
    : ownerState.completed
    ? '#29AA92' 
    : theme.palette.mode === 'dark'
    ? theme.palette.grey[700]
    : '#E3E3E3', // Grey otherwise
  zIndex: 1,
  color: '#868686',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  ...(ownerState.active && {
   boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
   color: '#fff',
  }),
  ...(ownerState.completed && {
    color: '#fff',
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, onClick } = props;

  const icons = {
    0: <PaymentIcon  />,
    1: <VerifiedOutlinedIcon />,
    2: <TaskAltIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      onClick={onClick}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

const steps = ['Payment mode', 'Verify', 'Payment Successful'];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0); // State to manage active step

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  return (
    <div className="main-container" sx={{width: '100%',
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Stack sx={{ width: '100%',
                 padding: 4 ,
                 backgroundColor: '#ffffff',
                 borderRadius: '16px',
                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                 maxWidth: '900px',
                 }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={(props) => (
                  <ColorlibStepIcon
                    {...props}
                    icon={index}
                    active={index === activeStep}
                    completed={index < activeStep}
                    onClick={() => handleStepClick(index)}
                  />
                )}
                sx={{
                  color: 'black',
                  fontFamily: 'Nunito Sans',
                  fontSize: 14,
                  fontStyle: 'normal',
                  backgroundColor: '#f5f5f5', 
                  fontWeight: 600,
                  lineHeight: '22px',
                  "&.MuiStepLabel-label":{
                    color: 'black',
                    fontFamily: 'Nunito Sans',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '22px',
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === 0 && (
            <div>
              <Payment activeStep={activeStep} />
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <Payment activeStep={activeStep}/>         
            </div>
          )}
          {activeStep === 2 && (
            <div>
                <Success />              
            </div>
          )}
        </div>
      </Stack>
    </div>
  );
}









