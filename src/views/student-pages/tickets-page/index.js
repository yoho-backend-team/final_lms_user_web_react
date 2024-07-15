import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStudentTickets,
  selectLoading,
} from "features/student-pages/tickets-page/redux/selectors";
import { useEffect } from "react";
import StudentDataTicketsPage from "features/student-pages/tickets-page/components";
import getAllStudentTickets from "features/student-pages/tickets-page/redux/thunks";


const StudentTicketsPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(selectStudentTickets);
  const loading = useSelector(selectLoading);
  const [currentType, setCurrentType] = useState("");

  const getTicketsList = (query) => {
    dispatch(getAllStudentTickets(query));
  };

  useEffect(() => {
    const data = { status: currentType? currentType: null };
    getTicketsList(data);
    console.log(data,"Currentype")
  }, [dispatch]);
  
  const handleTicketRefetch = (type) => {
    setCurrentType(type);
    const data = { status: type };
    getTicketsList(data);
    
  };

  
  console.log(tickets)
  return (
    <StudentDataTicketsPage
      data={tickets}
      setCurrentType={setCurrentType}
      handleTicketRefetch={handleTicketRefetch}
      loading={loading}
    />
  );
};

export default StudentTicketsPage;
