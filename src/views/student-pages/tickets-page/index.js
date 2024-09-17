import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showSpinner, hideSpinner } = useSpinner();

  const getTicketsList = async (query) => {
    try {
      showSpinner();
      const response = await dispatch(getAllStudentTickets(query));
      if (response && response.pagination) {
        setTotalPages(response.pagination.totalPages);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

 
  console.log(tickets,"tickets")
  useEffect(() => {
    const data = { status: currentType, page: currentPage, limit: 10 };
    getTicketsList(data);
  }, [dispatch, currentPage, currentType]);

  const handleTicketRefetch = (type) => {
    setCurrentType(type);
    setCurrentPage(1); 
    const data = { status: type, page: 1, limit: 10 };
    getTicketsList(data);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    const data = { status: currentType, page, limit: 10 };
    getTicketsList(data);
  };

 
  return (
    <StudentTicketsPage
      data={tickets}
      setCurrentType={setCurrentType}
      handleTicketRefetch={handleTicketRefetch}
      loading={loading}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
};

export default TicketsPage;
