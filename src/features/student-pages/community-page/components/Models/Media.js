import { Dialog,DialogContent,Box,Tabs,Tab,DialogActions,DialogTitle ,Button} from "@mui/material"
import { useState } from "react"



const MediaModel = ({open,setMediaOpen}) => {
    const [mediaTab, setMediaTab] = useState(0);

    const handleMediaTabChange = (event, newValue) => {
        setMediaTab(newValue);
      };

    return(
        <Dialog open={open} onClose={() => setMediaOpen(false)}>
        <DialogTitle>Group Media</DialogTitle>
        <DialogContent>
          <Tabs value={mediaTab} onChange={handleMediaTabChange}>
            <Tab label="Photos" />
            <Tab label="Videos" />
            <Tab label="PDF" />
            <Tab label="Links" />
          </Tabs>
          {mediaTab === 0 && <Box>Photos Content</Box>}
          {mediaTab === 1 && <Box>Videos Content</Box>}
          {mediaTab === 2 && <Box>PDF Content</Box>}
          {mediaTab === 3 && <Box>Links Content</Box>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMediaOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    )
}

export default MediaModel