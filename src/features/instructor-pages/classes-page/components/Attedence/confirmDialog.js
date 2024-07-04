import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Stack, Box } from "@mui/material";

const AttendanceConfirmDialog = ({ open, onClose, title, presentCount,absentCount,onSubmit }) => {
    return (
        <Dialog
           
            open={open}
            sx={{
                padding: "30px 55px",
                "& .MuiDialog-paper": {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f0f8ff", 
                    padding: "30px 55px",
                    minWidth : "400px"
                }
            }}
        >
            <DialogTitle
                sx={{
                    color: "#495057",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "32px",
                    padding : "0px",
                    marginBottom: "26px"
                }}
            >
                Confirm ?
            </DialogTitle>
            <Box
                padding = {"0px"}
                sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    textAlign: "center",
                    padding : "0px",
                    marginBottom: "30px",
                    ".MuiDialogContent-root" : {
                        padding : "0px"
                    }
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: "column", gap: "8px" }} >
                    <DialogContentText sx={{ color: "#6C757D", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }} >
                        Total Present
                    </DialogContentText>
                    <DialogContentText sx={{ color: "#495057", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }} >
                        {presentCount}
                    </DialogContentText>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", gap: "8px" }} >
                    <DialogContentText sx={{ color: "#6C757D", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }} >
                        Total Absent
                    </DialogContentText>
                    <DialogContentText sx={{ color: "#495057", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }} >
                        {absentCount}
                    </DialogContentText>
                </Box>
            </Box>
            <DialogActions sx={{ padding : "0px"}} >
                <Stack
                    flexDirection={"row"}
                    justifyContent={"center"}
                    gap={"30px"}
                >
                    <Button
                        sx={{
                            padding: "9px 24px",
                            borderRadius: "8px",
                            background: "#F8F9FA",
                            border: "1px solid #DEE2E6",
                            color: "#6C757D",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px"
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            padding: "9px 24px",
                            borderRadius: "8px",
                            background: "#5611B1",
                            border: "0px 6px 34px -8px #0D6EFD",
                            color: "#FBFBFB",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px"
                        }}
                        onClick={onSubmit}
                    >
                        Save
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}

export default AttendanceConfirmDialog;
