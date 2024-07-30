import { Grid } from "@mui/material";
import StudentHelpCard from "../helpCard";
import { useEffect, useState } from "react";
import Client from "../../../../../api/index";


const StudentMailTab = ({ setView, SelectedQuery,category}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setView(category);
  };


  
  
 
  return (
    <Grid container spacing={2}>
      {category?.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <StudentHelpCard
            section={item.question}
            title={item.answer}
            video={item.videolink}
            setView={() => handleCategorySelect(item)}
            category={item.category}
            
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentMailTab;