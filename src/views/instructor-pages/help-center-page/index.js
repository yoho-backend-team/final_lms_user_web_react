import InstructorHelpCenter from "features/student-pages/help-center-page/components";
import InstructorHelpCenterLayout from "features/student-pages/help-center-page/components/layout";
import React from "react";


const HelpCenterPage = () => {
  return (
    <InstructorHelpCenterLayout>
      <InstructorHelpCenter/>
    </InstructorHelpCenterLayout>
  );
};

export default HelpCenterPage;