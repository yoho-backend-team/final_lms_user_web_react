import React from 'react';
import { Box } from '@mui/material';
import ClassCard from "../card/ClassCard"
import FilterHeader from './FilterCard';


const classes = [
  { id: '1', title: 'Basics of User Experience', subject: 'UX Design', date: '29 Feb 2024', time: '10:30 AM', duration: '45min' },
  { id: '2', title: 'Basics of User Experience', subject: 'UX Design', date: '30 Feb 2024', time: '10:30 AM', duration: '45min' },
  { id: '3', title: 'Basics of User Experience', subject: 'UX Design', date: '31 Feb 2024', time: '10:30 AM', duration: '45min' },
];

const defaultStyles = {
  calendarColor : "#000000",
  timerColor : "#2AAD37",
  durationTextColor : "rgba(32, 201, 151, 1)",
  durationColor : "rgba(210, 244, 234, 1)"
}

const ClassHistory = ({data,classType}) => {

  const [filters, setFilters] = React.useState({
    class: '',
    course: '',
    month: '',
    year: ''
  });

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({ ...prev, [filter]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      class: '',
      course: '',
      month: '',
      year: ''
    });
  };

  return (
    <>
    <FilterHeader filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
    <Box sx={{ mt: 3, px: '40px' }}>
      {data.map((cls) => (
        <ClassCard key={cls.id} cls={cls} style={defaultStyles} type={classType} />
      ))}
    </Box>
    </>
  );
};

export default ClassHistory;
