import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { formatDate } from "utils/formatDate";

// Styled components
const CardContainer = styled(Grid)(({ theme }) => ({
  width: '300px',
  height: '250px',
  borderRadius: '16px',
  padding: '25px',
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '18px',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

const Progress = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '36px',
  fontWeight: 700,
}));

const DateInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[100],
  marginTop: theme.spacing(2),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
  fontWeight: 500,
}));

const BatchCard = ({
  id,
  title,
  progress,
  classes,
  students,
  class_details,
  setSelectedBatch
}) => {
  return (
    <CardContainer
      onClick={() => setSelectedBatch(class_details)}
      item
      key={id}
    >
      <Box>
        <Title>{title}</Title>
        <Progress>{progress}</Progress>
      </Box>

      <DateInfo>
        <Box>
          {/* <Typography variant="body2" color="textSecondary">Start</Typography> */}
          <Typography variant="subtitle1" color="textPrimary">{ formatDate(class_details?.start_date)}</Typography>
        </Box>
        <Box>
           <Typography >-</Typography>
        </Box>
        <Box>
          {/* <Typography variant="body2" color="textSecondary">End</Typography> */}
          <Typography variant="subtitle1" color="textPrimary">{formatDate(class_details?.end_date)}</Typography>
        </Box>
      </DateInfo>

      <InfoBox>
        <InfoItem>
          <GroupOutlinedIcon sx={{ color: "primary.main", width: "20px", height: "20px" }} />
          <InfoText>{students} Students</InfoText>
        </InfoItem>
        <InfoItem>
          <SmartDisplayOutlinedIcon sx={{ color: "primary.main", width: "20px", height: "20px" }} />
          <InfoText>{classes} Classes</InfoText>
        </InfoItem>
      </InfoBox>
    </CardContainer>
  );
};

export default BatchCard;
