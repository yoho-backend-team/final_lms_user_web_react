import { Box, Typography, Paper, Tooltip, Fade } from "@mui/material";
import { keyframes } from "@mui/system";
import { ArrowForward } from "@mui/icons-material";

// Refined animation with smoother timing
const pulseEffect = keyframes`
  0% { transform: translateY(0); box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); }
  60% { transform: translateY(-5px); box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.15); }
  100% { transform: translateY(0); box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); }
`;

/**
 * PaymentCard - A premium payment information display component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} props.title - Card title
 * @param {string} props.amount - Payment amount text
 * @param {string} props.description - Optional description text below amount
 * @param {Object} props.style - Custom styling object
 * @param {string} props.style.bg - Background color
 * @param {string} props.style.hoverBg - Hover background color
 * @param {string} props.style.color - Amount text color
 * @param {string} props.style.iconBg - Icon background color
 * @param {string} props.style.borderColor - Border color if border is enabled
 * @param {string} props.tooltipText - Optional tooltip text on hover
 * @param {boolean} props.border - Whether to show border
 * @param {boolean} props.showArrow - Whether to show arrow on hover
 * @param {function} props.onClick - Click handler function
 * @param {Object} props.status - Optional status indicator
 * @param {string} props.status.type - Status type ('success', 'warning', 'error', etc)
 * @param {string} props.status.text - Status text
 */
const PaymentCard = ({
  icon,
  title,
  amount,
  description,
  style = {},
  tooltipText,
  border = false,
  showArrow = false,
  onClick,
  status
}) => {
  const card = (
    <Paper
      elevation={style?.elevation || 1}
      onClick={onClick}
      sx={{
        display: "flex", 
        flexDirection: "row",
        alignItems: "center",
        padding: "18px 22px",
        gap:"23px",
        height: "120px",
        border: border ? `1px solid ${style?.borderColor || "#E0E0E0"}` : "none",
        backgroundColor: style?.bg || "#FFFFFF",
        borderRadius: "14px",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        
        // Enhanced hover effects
        "&:hover": {
          backgroundColor: style?.hoverBg || "#F8F9FA",
          transform: onClick ? "translateY(-3px)" : "none",
          boxShadow: onClick ? "0px 8px 20px rgba(0, 0, 0, 0.12)" : undefined,
          ...(onClick && { animation: `${pulseEffect} 2s ease-in-out` }),
          
          // Show arrow icon on hover if enabled
          "& .arrow-icon": {
            opacity: showArrow ? 1 : 0,
            transform: "translateX(0)",
          },
          
          // Highlight icon on hover
          "& .icon-container": {
            backgroundColor: style?.iconHoverBg || "#F0F4FF",
            transform: "scale(1.05)",
          }
        },
        
        // Active state for better feedback
        "&:active": onClick ? {
          transform: "translateY(0)",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
        } : {},
      }}
    >
      {/* Icon container with enhanced styling */}
      <Box
        className="icon-container"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "52px",
          height: "52px",
          mr: 3,
          backgroundColor: style?.iconBg || "#F7F9FC",
          borderRadius: "12px",
          transition: "all 0.2s ease-out",
          boxShadow: style?.iconShadow || "none",
        }}
      >
        {icon}
      </Box>

      {/* Content container with improved layout */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#212529",
            fontSize: "16px",
            fontWeight: "600",
            mb: 0.5,
            lineHeight: 1.3,
            letterSpacing: "0.01em"
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: style?.color || "#495057",
              fontSize: "16px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
            }}
          >
            {amount}
          </Typography>
          
          {/* Status indicator if provided */}
          {status && (
            <Box
              sx={{
                ml: 2,
                px: 1.5,
                py: 0.3,
                borderRadius: "12px",
                backgroundColor: {
                  success: "#E6F7EB",
                  warning: "#FFF8E6",
                  error: "#FFEDE9",
                }[status.type] || "#F0F0F0",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              <Typography 
                sx={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: {
                    success: "#2E7D32",
                    warning: "#ED6C02",
                    error: "#D32F2F",
                  }[status.type] || "#616161"
                }}
              >
                {status.text}
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* Optional description text */}
        {description && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "#6C757D",
              mt: 0.5,
              fontSize: "13px",
              maxWidth: "95%"
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Arrow indicator for interactive cards */}
      <Box
        className="arrow-icon"
        sx={{
          opacity: 0,
          transform: "translateX(10px)",
          transition: "all 0.3s ease-out",
          color: style?.arrowColor || "#6C757D",
        }}
      >
        {showArrow && <ArrowForward fontSize="small" />}
      </Box>
    </Paper>
  );

  // Wrap with tooltip if tooltipText is provided
  return tooltipText ? (
    <Tooltip 
      title={tooltipText} 
      arrow 
      placement="top" 
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
    >
      {card}
    </Tooltip>
  ) : card;
};

export default PaymentCard;