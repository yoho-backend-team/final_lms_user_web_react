import {  Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,Button
} from "@mui/material"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';



const DeleteModel = ({openDeleteDialog,setOpenDeleteDialog,confirmDelete,title}) => {
    return(
        <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center'}} >
           <HighlightOffOutlinedIcon sx={{ color: 'red', height: "40px", width: "40px"}} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText  sx={{ color: "gray", fontSize: "15px", fontWeight: 700}}>
            {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
          size="medium"
          sx={{
            color: "white",
            backgroundColor: "gray",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize : "15px",
            fontWeight : 500,
            transition: "all 0.3s ease",
            ":hover": {
              backgroundColor: "grey",
              padding: "12px 22px",
              boxShadow: 3,
            },
          }}
          variant="contained"
          onClick={() => setOpenDeleteDialog(false)}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={confirmDelete}
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize : "15px",
            fontWeight : 500,
            transition: "all 0.3s ease",
            ":hover": {
              backgroundColor: "red",
              transform: "initial",
              padding: "12px 22px",
              boxShadow: 3,
            },
          }}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
      </Dialog>
    )
}

export default DeleteModel