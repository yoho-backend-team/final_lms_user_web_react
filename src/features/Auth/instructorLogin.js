import { instructorLoginStepAtom} from "store/atoms/authAtoms";
import { useAtom } from "jotai";
import InstructorAuthLayout from 'layout/InstructorAuthLayout';
import InstructorLoginForm from "./Instructor/login-form";
import InstructorOTPInput from "./Instructor/instructorOtp";


const InstructorLogin = () => {
    const [loginStep] = useAtom(instructorLoginStepAtom)

    const map_to_form = {
      login : InstructorLoginForm,
      otp : InstructorOTPInput
    }

    const Component = map_to_form[loginStep]

  return (
    <InstructorAuthLayout>
        <Component />
    </InstructorAuthLayout>
  );
}

export default InstructorLogin;
