import { instructorLoginStepAtom } from "store/atoms/authAtoms";
import { useAtom } from "jotai";
import InstructorAuthLayout from "layout/InstructorAuthLayout";
import InstructorLoginForm from "./Instructor/login-form";
import InstructorOTPInput from "./Instructor/instructorOtp";
import ForgetPasswordPage from "./Instructor/forgetPassword.js";
import ForgetPasswordOTPInput from './Instructor/forgetPassword-otp.js'
import EnterNewPasswordPage from "./Instructor/newPassword.js"
const InstructorLogin = () => {
  const [loginStep, setLoginStep] = useAtom(instructorLoginStepAtom);

  const map_to_form = {
    login: InstructorLoginForm,
    otp: InstructorOTPInput,
    forgetPassword: ForgetPasswordPage,
    forgetPassword_Otp: ForgetPasswordOTPInput,
    enterNewPassword: EnterNewPasswordPage,
  };

  const Component = map_to_form[loginStep];

  return (
    <InstructorAuthLayout>
      <Component />
    </InstructorAuthLayout>
  );
};

export default InstructorLogin;
