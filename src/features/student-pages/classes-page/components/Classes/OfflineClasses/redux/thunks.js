import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchData = async (endpoint) => {
  // Simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(['Option 1', 'Option 2', 'Option 3']);
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};

const fetchClassesData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve([
          {
            id: 1,
            title: "Basics of User Experience",
            subtitle: "UX Design",
            date: "14 Feb 2024",
            startTime: "10:30AM",
            endTime: "11:35AM",
            duration: "1hr 5 min",
            status: "Completed",
          },
          {
            id: 2,
            title: "Advanced User Experience",
            subtitle: "UX Design",
            date: "15 Mar 2024",
            startTime: "12:00PM",
            endTime: "2:10PM",
            duration: "2hr 10 min",
            status: "Live",
          },
        ]);
      } else {
        reject(new Error('Failed to fetch classes'));
      }
    }, 1000);
  });
};

export const fetchClasses = createAsyncThunk('class/fetchClasses', async () => {
  const response = await fetchClassesData();
  return response;
});

export const fetchCourses = createAsyncThunk('class/fetchCourses', async () => {
  const response = await fetchData('courses');
  return response;
});

export const fetchMonths = createAsyncThunk('class/fetchMonths', async () => {
  const response = await fetchData('months');
  return response;
});

export const fetchYears = createAsyncThunk('class/fetchYears', async () => {
  const response = await fetchData('years');
  return response;
});
