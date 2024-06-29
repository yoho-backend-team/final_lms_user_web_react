import { Dialog, DialogTitle, DialogContent, Typography, FormControl, FormControlLabel, Radio, DialogActions, Button, Checkbox } from "@mui/material";

const MuteNotificationModel = ({ open, setMuteOpen }) => {
    return (
        <Dialog open={open} onClose={() => setMuteOpen(false)}>
            <DialogTitle sx={{ color: "#000000", fontSize: "20px", fontWeight: 800 }}>Mute Notifications</DialogTitle>
            <DialogContent>
                <Typography sx={{ color: "#5A5A5A", fontSize: "14px", fontWeight: 600 }}>
                    Other members will not see that you muted this chat. You will still be notified if you are mentioned.
                </Typography>
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormControlLabel 
                        control={<Checkbox sx={{ '&.Mui-checked': { color: "#0D6EFD" }, color: "#0D6EFD" }} />} 
                        label={<Typography sx={{ color: "#3B6199" }}>Notify to emergency (Abusive & Non-course Related)</Typography>} 
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="outlined" 
                    sx={{ padding: "9px 24px", background: "#F8F9FA", borderRadius: "8px", border: "1px solid #DEE2E6" }} 
                    onClick={() => setMuteOpen(false)}
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ padding: "9px 24px", backgroundColor: "#0D6EFD", boxShadow: "0px 6px 34px -8px #0D6EFD", borderRadius: "8px" }} 
                    onClick={() => setMuteOpen(false)}
                >
                    Report
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MuteNotificationModel;
