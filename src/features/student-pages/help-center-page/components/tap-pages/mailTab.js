import { Grid } from "@mui/material";
import StudentHelpCard from "../helpCard";
import { useEffect, useState } from "react";
import Client from "../../../../../api/index";

const StudentMailData = [
  {
    section: "Mail",
    title: "Explaining design to someone who doesn’t understand what it is",
    id: 1,
  },
  { section: "Mail", title: "Another mail topic", id: 2 },
  { section: "Mail", title: "Mail topic 3", id: 3 },
  { section: "Mail", title: "Mail topic 4", id: 4 },
  { section: "Mail", title: "Mail topic 5", id: 5 },
  { section: "Mail", title: "Mail topic 6", id: 6 },
];



const StudentMailTab = ({ setView ,setSelectedQuery}) => {
  const [faqCategories, setFaqCategories] = useState([]);
  
  

useEffect(() => {
  const fetchFaqCategories = async () => {
    try {
      const response = await Client.Student.faq.get();
      setFaqCategories(response?.data || []);
    } catch (error) {
      console.error("Error fetching FAQ categories:", error.message);
    }
  };

  fetchFaqCategories();
}, []);

const handleTabClick = (new_category) => {
  setSelectedQuery(new_category)
  setView(true)
  console.log(new_category)
}

console.log(faqCategories,"faq12")
  return (
    <Grid container spacing={2}>
      {faqCategories.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <StudentHelpCard
            section={item.title}
            title={item.description}
            setView={setView}
            handleTabClick={handleTabClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentMailTab;