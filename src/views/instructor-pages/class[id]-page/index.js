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

  const getTimeVariants1 = (start_date,start_time,end_time) => {
       const now = new Date()
       const class_start_date = new Date(start_date)
       const class_start_time = new Date(start_time)
       const class_end_time = new Date(end_time)

       const sameYear = now.getFullYear() === class_start_date.getFullYear()
       const sameMonth = now.getMonth() === class_start_date.getMonth()
       const sameDay = now.getDate() === class_start_date.getDate()
       const isPastDay = sameYear && now.getMonth() >= class_start_date.getMonth() && now.getDate() !== class_start_date.getDate()
       const isCurrentDay = sameYear && sameMonth && sameDay
       const isFutureDay = sameYear && now.getMonth() <= class_start_date?.getMonth() && !sameDay
       const betweenTime = isCurrentDay && now.getHours() >= class_start_time.getHours()
       const isEndedToday = isCurrentDay && now.getHours() > class_end_time.getHours() 
       console.log("same year:",sameYear,"same month:",sameMonth,"same day:",sameDay,"is past day:",isPastDay,"is current day:",isCurrentDay,"is future day:",isFutureDay,"current hours:",now.getHours(),
       "current minutes:",now.getMinutes(),"current milli seconds:",now.getMilliseconds(),
       "class start hour:",class_start_time.getHours(),"class start minutes:",class_start_time.getMinutes(),"class start milli seconds:",class_start_time.getMilliseconds(),
       "class end hour:",class_end_time.getHours(),"class end time:",class_end_time.getMinutes(),"class end time",class_end_time.getMilliseconds(),"is bestartTimeBetween",betweenTime,"isEndTimeAfter",isEndedToday)
  }

  const getTimeVariants = (start_date) => {
    const now =  new Date()
    const start = new Date(start_date)
    const start_year = start.getFullYear() === now.getFullYear()
    const start_month = start.getMonth() <= now.getMonth()
    const start_time = start.getDate() !== now.getDate()
    const isToday = start_year && start_month && start.getDate() === now.getDate()
    console.log(start_year,start_month,start_time,now.getMonth(),start.getMonth(),start.getDate(),now.getDate(),isToday)

    const isPast = start_year && start_month && start_time
    const isFuture = start_year && start.getMonth() >= now.getMonth()
    console.log(isPast,isFuture)
    return {isPast,isFuture}
  }
  getTimeVariants1(classDetails?.start_date,classDetails?.start_time,classDetails?.end_time)
 
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
