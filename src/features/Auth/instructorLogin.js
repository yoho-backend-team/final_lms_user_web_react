import { instructorLoginStepAtom } from "store/atoms/authAtoms";
import { useAtom } from "jotai";
import InstructorAuthLayout from "layout/InstructorAuthLayout";
import InstructorLoginForm from "./Instructor/login-form";
import InstructorOTPInput from "./Instructor/instructorOtp";
import ForgetPasswordPage from "./Instructor/forgetPassword.js";
import ForgetPasswordOTPInput from './Instructor/forgetPassword-otp.js'
import EnterNewPasswordPage from "./Instructor/newPassword.js"
import { EnterNewPassword_Step, ForgetPassword_Otp_Step, ForgetPassword_Step, Login_Step, Otp_Step } from "lib/constants";
const InstructorLogin = () => {
  const [loginStep, setLoginStep] = useAtom(instructorLoginStepAtom);

  const map_to_form = {
    [Login_Step]: InstructorLoginForm,
    [Otp_Step]: InstructorOTPInput,
    [ForgetPassword_Step]: ForgetPasswordPage,
    [ForgetPassword_Otp_Step]: ForgetPasswordOTPInput,
    [EnterNewPassword_Step]: EnterNewPasswordPage,
  };

  const Component = map_to_form[loginStep] ? map_to_form[loginStep] : map_to_form[Login_Step]

  return (
    <InstructorAuthLayout>
      <Component />
    </InstructorAuthLayout>
  );
};

export default InstructorLogin;
