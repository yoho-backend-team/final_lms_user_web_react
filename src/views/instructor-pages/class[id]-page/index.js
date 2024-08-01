import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import ClassCard from "features/instructor-pages/classes-page/components/classOverview";
import ClassLayout from "features/instructor-pages/classes-page/components/classLayout";
import { getClassDetails } from "features/instructor-pages/classes-page/services";
import { useSpinner } from "context/SpinnerProvider";
import { getYearList } from "utils/dateUtils";

const ClassViewPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { id } = useParams();
  const classId = location?.state?.id;
  const classType = searchParams.get("type");
  const groupType = searchParams.get("group")
  const year_list = getYearList()
  console.log(year_list,"year_list")
  const [classDetails, setClassDetails] = useState(null);
  const { showSpinner, hideSpinner } = useSpinner();

  const getClass = async () => {
    showSpinner();
    const data = { classType: classType, course: id };
    const response = await getClassDetails(data);
    setClassDetails(response);
    hideSpinner();
  };

  useEffect(() => {
    getClass();
  }, []);

  const formatDateYYMMDDFormat = (now) => {
    const year = now.getFullYear()
    const month = String(now.getMonth()+1).padStart(2,"0")
    const date = String(now.getDate()).padStart(2,"0")
    return `${year}-${month}-${date}`
  }

  const isCurrentTimeBetween = (start,end,now) => {
    return now >= start && now <= end
  }

  const getTimeVariants = (start_date) => {
    const now =  new Date()
    const start = new Date(start_date)
    const start_year = start.getFullYear() === now.getFullYear()
    const start_month = start.getMonth() <= now.getMonth()
    const start_time = start.getDate() !== now.getDate()

    const isPast = start_year && start_month && start_time
    const isFuture = start_year && start.getMonth() >= now.getMonth()
    return {isPast,isFuture}
  }

  const findTheDetails = () => {
    const now = new Date()
    const start_time = new Date(classDetails?.start_time)
    const end_time = new Date(classDetails?.end_time)
  }
  findTheDetails()
  return (
    <ClassLayout>
      <ClassCard
        type={classType}
        classDetails={classDetails}
        getClass={getClass}
        group={groupType}
      />
    </ClassLayout>
  );
};

export default ClassViewPage;
