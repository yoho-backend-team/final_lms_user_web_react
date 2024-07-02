import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, RadioGroup, FormControl, Radio, FormControlLabel, Button } from "@mui/material";

const ReportModel = ({ open, setReportOpen }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setReportOpen(false)}
            PaperProps={{
                sx: {
                    padding: "70px 49px 105px 50px",
                    boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.35)",
                    borderRadius: "25px"
                }
            }}
        >
            <DialogTitle sx={{ color: "#000000", fontSize: "20px", fontWeight: 800}}>Report ?</DialogTitle>
            <DialogContent sx={{ padding: "0px", paddingTop: "16px" }}>
                <Typography sx={{ color: "#5A5A5A", fontSize: "14px", fontWeight: 600 }}>
                    The Last 24 hours Chat will be forwarded to LMS for cross verification, messages will only be removed from this device and your devices on the updated version of LMS
                </Typography>
                <FormControl sx={{ width: "100%", paddingTop: "24px" }}>
                    <RadioGroup sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <FormControlLabel
                            value={"8_hours"}
                            control={<Radio sx={{ '&.Mui-checked': { color: "#0D6EFD" }, color: "#0D6EFD" }} />}
                            label={<Typography sx={{ color: "#000000", fontSize: "14px", fontWeight: "700" }}>8 Hours</Typography>}
                        />
                        <FormControlLabel
                            value={"1_week"}
                            control={<Radio sx={{ '&.Mui-checked': { color: "#0D6EFD" }, color: "#0D6EFD" }} />}
                            label={<Typography sx={{ color: "#000000", fontSize: "14px", fontWeight: "700" }}>1 Week</Typography>}
                        />
                        <FormControlLabel
                            value={"1_alwasy"}
                            control={<Radio sx={{ '&.Mui-checked': { color: "#0D6EFD" }, color: "#0D6EFD" }} />}
                            label={<Typography sx={{ color: "#000000", fontSize: "14px", fontWeight: "700" }}>1 Always</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
        </Dialog>
    );
};

export default ReportModel;
