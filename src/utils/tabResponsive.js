import { useMediaQuery, useTheme } from "@mui/material";

export const useTabResponsive = () => {
  const theme = useTheme();
  // const tabView = useMediaQuery(theme.breakpoints.down("md"));
  const tabView = useMediaQuery('(max-width:900px)');

  return { tabView };
};
