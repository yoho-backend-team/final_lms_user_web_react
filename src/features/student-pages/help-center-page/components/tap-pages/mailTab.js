import { Grid } from "@mui/material";
import StudentHelpCard from "../helpCard";
import { useEffect, useState } from "react";
import Client from "../../../../../api/index";


const StudentMailTab = ({ setView, SelectedQuery,category}) => {
  
 
console.log(category,"faq12")
  return (
    <Grid container spacing={2}>
      {category?.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <StudentHelpCard
            section={item.question}
            title={item.answer}
            setView={setView}
            category={SelectedQuery}
            
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentMailTab;