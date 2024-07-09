import StudentHelpCenter from "features/student-pages/help-center-page/components";
import StudentHelpCenterLayout from "features/student-pages/help-center-page/components/layout";
import React from "react";


const HelpCenterPage = () => {
  return (
    <StudentHelpCenterLayout>
      <StudentHelpCenter/>
    </StudentHelpCenterLayout>
  );
};

export default HelpCenterPage;