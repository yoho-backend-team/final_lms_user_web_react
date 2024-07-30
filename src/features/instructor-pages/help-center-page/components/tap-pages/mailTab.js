import { Grid } from "@mui/material";

import { useEffect, useState } from "react";
import InstructorHelpCard from "../helpCard";


const InstructorMailTab = ({ setView, SelectedQuery,category}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  
  
 

  return (
    <Grid container spacing={2}>
      {category?.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <InstructorHelpCard
            section={item.question}
            title={item.answer}
            setView={handleCategorySelect}
            category={setView}
            
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default InstructorMailTab;