import { getBatchesWithCourseId } from "features/instructor-pages/courses-page/courses-overview-page/courses/services";
import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTabResponsive } from "utils/tabResponsive";
import toast from "react-hot-toast";
import BatchCard from "../Batches/batchCard";
import { useSpinner } from "context/SpinnerProvider";

const modules = [
  {
    card: "120deg, #0068FF 2.28%, #141BC4 100%",
    color: "#FFFFFF",
    background: "#2E80F9",
  },
  {
    card: "118deg, #CF75FF 1.82%, #670BC3 97.62%",
    color: "#801FBB",
    background: "#D68AFF",
  },
  {
    card: "118deg, #FADB39 1.75%, #F90 100%",
    color: "#E19F10",
    background: "#FFE686",
  },
  {
    card: "118deg, #ED7071 1.82%, #C30BBC 97.62%",
    color: "#BE2563",
    background: "#FFA3BC",
  },
  {
    card: "118deg, #70ED7C 1.82%, #0BADC3 97.62%",
    color: "#26A456",
    background: "#8AEFB2",
  },
  {
    card: "118deg, #9070ED 1.82%, #0BADC3 97.62%",
    color: "#646CDC",
    background: "#A4ACF4",
  },
  // Additional colors
  {
    card: "120deg, #FF6F61 2.28%, #D63A34 100%",
    color: "#FF6F61",
    background: "#F29A8E",
  },
  {
    card: "120deg, #FFD700 2.28%, #FFA500 100%",
    color: "#FFD700",
    background: "#FFEB90",
  },
  {
    card: "120deg, #00FF00 2.28%, #008000 100%",
    color: "#00FF00",
    background: "#98FB98",
  },
  {
    card: "120deg, #00FFFF 2.28%, #008080 100%",
    color: "#00FFFF",
    background: "#B0E0E6",
  },
];


const BatchesPage = ({ openCourseView, closeCourseView, course ,setSelectedBatch}) => {
  const { tabView } = useTabResponsive();
  const [batches,setBatches] = useState(null)
  const { showSpinner, hideSpinner } = useSpinner()

  const getCycledModule = (index) => {
    const modIndex = index % course?.batches?.[0]?.classes?.length;
    return modules[modIndex];
  };

  useEffect(() => {
    const getbatchList = async () => {
       try {
        showSpinner()
        const params = { "course": course?.uuid}
        const response = await getBatchesWithCourseId(params) 
        setBatches(response)
       } catch (error) {
         toast.error(error?.message)
       }finally{
        hideSpinner()
       } 
    }
    getbatchList()
  },[])
  
  console.log(batches,"batches")
  return (
    <Box sx={{ padding: tabView ? "20px" : "60px" }}>
      <Grid container xs={12} gap={tabView ? "60px" : "20px"}>
        {batches?.map((batch,index) => (
          <Grid item>
            <BatchCard 
              key={batch?._id + index}
              id={batch?._id}
              style={getCycledModule(index)}
              title={batch.batch_name}
              students={batch.student.length}
              classes={batch.classes.length}
              progress={""}
              closeCourseView={closeCourseView}
              openCourseView={openCourseView}
              setSelectedBatch={setSelectedBatch}
              class_details ={ batch}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BatchesPage
