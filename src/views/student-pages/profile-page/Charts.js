import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line
} from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { name: '1st week', Exams: 2, 'Assignment/Project': 1 },
  { name: '2nd week', Exams: 1, 'Assignment/Project': 2 },
  { name: '3rd week', Exams: 3, 'Assignment/Project': 3 },
  { name: '4th week', Exams: 5, 'Assignment/Project': 4 },
];

const ProgressChart = () => {
  return (
    <Box sx={{ p: 2, width: '100%', maxWidth: 600, mx: 'auto',}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ color: '#000000', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 700, lineHeight: '26px', textAlign: 'left' }}>
        Progress
      </Typography>
      <Typography variant="body2" color="#000000" sx={{ fontFamily: 'Work Sans', fontSize: '14px', fontWeight: 400, lineHeight: '16.42px', textAlign: 'left', marginBottom: '0.35em' }}>
        May 2024
      </Typography>
    </Box>
    
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 20, right: 20, left: 0, bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorExams" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF5722" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#673AB7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#673AB7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Exams" stroke="#FF5722" fillOpacity={1} fill="url(#colorExams)" />
          <Area type="monotone" dataKey="Assignment/Project" stroke="#673AB7" fillOpacity={1} fill="url(#colorProjects)" />
          <Line type="monotone" dataKey="Exams" stroke="#FF5722" strokeWidth={2} dot={{ r: 5, fill: '#FF5722' }} />
          <Line type="monotone" dataKey="Assignment/Project" stroke="#673AB7" strokeWidth={2} dot={{ r: 5, fill: '#673AB7' }} />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProgressChart;
