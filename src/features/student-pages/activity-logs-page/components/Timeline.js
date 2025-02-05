import React, { useEffect, useState } from 'react';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot, 
  TimelineOppositeContent 
} from '@mui/lab';
import { Typography, Box, Paper, useTheme } from '@mui/material';
import { 
  ConfirmationNumberOutlined,
  PersonOutline,
  DeleteOutline,
  LockReset
} from '@mui/icons-material';
import { formatDate, formatTime } from 'utils/formatDate';
import { getAllStudentActivity } from '../services';

const TimelineComponent = ({ filterData }) => {
  const [activityLogs, setActivityLogs] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const logs = await getAllStudentActivity();
        setActivityLogs(logs);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      }
    };
    fetchActivityLogs();
  }, []);

  const getIcon = (type) => {
    const iconStyle = { fontSize: 16 };
    const dotStyle = {
      width: 24,
      height: 24,
      boxShadow: theme.shadows[1],
      alignItems: 'center',
      justifyContent: 'center'
    };

    switch (type) {
      case 'login':
        return (
          <TimelineDot color="primary" sx={{ ...dotStyle, backgroundColor: '#e3f2fd' }}>
            <PersonOutline sx={{ ...iconStyle, color: theme.palette.primary.main }} />
          </TimelineDot>
        );
      case 'delete':
        return (
          <TimelineDot sx={{ ...dotStyle, backgroundColor: '#ffebee' }}>
            <DeleteOutline sx={{ ...iconStyle, color: theme.palette.error.main }} />
          </TimelineDot>
        );
      case 'passwordChange':
        return (
          <TimelineDot sx={{ ...dotStyle, backgroundColor: '#e8f5e9' }}>
            <LockReset sx={{ ...iconStyle, color: theme.palette.success.main }} />
          </TimelineDot>
        );
      case 'Ticket Create':
        return (
          <TimelineDot sx={{ ...dotStyle, backgroundColor: '#fff3e0' }}>
            <ConfirmationNumberOutlined sx={{ ...iconStyle, color: theme.palette.warning.main }} />
          </TimelineDot>
        );
      default:
        return <TimelineDot sx={dotStyle} />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'login': return theme.palette.primary.main;
      case 'delete': return theme.palette.error.main;
      case 'passwordChange': return theme.palette.success.main;
      case 'Ticket Create': return theme.palette.warning.main;
      default: return theme.palette.divider;
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 800,
      margin: '0 auto',
      p: 3,
      [theme.breakpoints.down('sm')]: {
        p: 1,
        maxWidth: '100%'
      }
    }}>
      <Timeline position="alternate" sx={{ p: 0 }}>
        {filterData.map((log, index) => (
          <TimelineItem key={log.id}>
            <TimelineOppositeContent
              sx={{
                flex: 0.2,
                minWidth: 120,
                pt: 1.5,
                [theme.breakpoints.down('sm')]: { display: 'none' }
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  display: 'block'
                }}
              >
                {formatDate(log.updatedAt)}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400
                }}
              >
                {formatTime(log.updatedAt)}
              </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              {getIcon(log.action)}
              {index < filterData.length - 1 && (
                <TimelineConnector sx={{ backgroundColor: 'divider' }} />
              )}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 2, px: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  borderLeft: `4px solid ${getBorderColor(log.action)}`,
                  backgroundColor: 'background.paper',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: theme.shadows[2]
                  }
                }}
              >
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ 
                    fontWeight: 600,
                    mb: 0.5,
                    color: 'text.primary'
                  }}
                >
                  {log.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    lineHeight: 1.4,
                    mb: 1
                  }}
                >
                  {log.description || `User ${log.user?.username} performed ${log.action}`}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.disabled',
                      fontSize: '0.75rem'
                    }}
                  >
                    {log.user?.email}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.disabled',
                      fontSize: '0.75rem'
                    }}
                  >
                    {formatTime(log.createdAt)}
                  </Typography>
                </Box>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default TimelineComponent;