import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import ClassCard from "features/student-pages/classes-page/components/classOverview";
import ClassLayout from "features/student-pages/classes-page/components/classLayout";
import { getClassDetails } from "features/student-pages/classes-page/services";
import { useSpinner } from "context/SpinnerProvider";

const ClassViewPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { id } = useParams();
  const classId = location?.state?.id;
  const classType = searchParams.get("type");
  const groupType = searchParams.get("group")
  const [classDetails, setClassDetails] = useState(null);
  const { showSpinner, hideSpinner } = useSpinner();
  
  const getClass = async () => {
    showSpinner();
    const data = { classType: classType, course: classId, id : classId };
    const response = await getClassDetails(data);
    setClassDetails(response);
    hideSpinner();
  };

  useEffect(() => {
    getClass();
  }, []);
  

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
