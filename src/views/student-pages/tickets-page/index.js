import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { selectLoading, selectStudentTickets } from "features/student-pages/tickets-page/redux/selectors";
import StudentTicketsPage from "features/student-pages/tickets-page/components";
import getAllStudentTickets from "features/student-pages/tickets-page/redux/thunks";

const TicketsPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(selectStudentTickets);
  const loading = useSelector(selectLoading);
  const [currentType, setCurrentType] = useState(null);
  const { showSpinner,hideSpinner } = useSpinner()

  const getTicketsList = (query) => {
    try {
      showSpinner()
      dispatch(getAllStudentTickets(query));  
    } catch (error) {
      console.log(error)
      toast.error(error?.message)
    }finally{
     hideSpinner()
    }
  };

  useEffect(() => {
    const data = { status: currentType };
    getTicketsList(data);
  }, [dispatch]);

  const handleTicketRefetch = (type) => {
    setCurrentType(type);
    const data = { status: type };
    getTicketsList(data);
  };
   console.log(tickets,"tickets")
   
  return (
    <StudentTicketsPage
      data={tickets}
      setCurrentType={setCurrentType}
      handleTicketRefetch={handleTicketRefetch}
      loading={loading}
    />
  );
};

export default TicketsPage;
