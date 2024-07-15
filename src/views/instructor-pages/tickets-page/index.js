import React, { useState } from "react";
import InstructorTicketsPage from "features/instructor-pages/tickets-page/components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstructorTickets,
  selectLoading,
} from "features/instructor-pages/tickets-page/redux/selectors";
import getAllTickets from "features/instructor-pages/tickets-page/redux/thunks";
import { useEffect } from "react";

const TicketsPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(selectInstructorTickets);
  const loading = useSelector(selectLoading);
  const [currentType, setCurrentType] = useState(null);

  const getTicketsList = (query) => {
    dispatch(getAllTickets(query));
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

  return (
    <InstructorTicketsPage
      data={tickets}
      setCurrentType={setCurrentType}
      handleTicketRefetch={handleTicketRefetch}
      loading={loading}
    />
  );
};

export default TicketsPage;
