import Client from "../../../api/index";
import {
  instructorLoginStepAtom,
  instructorOtpAtom,
  instructorUserAtom,
  studentLoginStepAtom,
  studentUserAtom,
  studentOtpAtom,
} from "store/atoms/authAtoms";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { compressAndStore } from "utils/auth_helpers";
import { Instructor_Details, Instructor_Role, Instructor_Token, isAuthenticatedInstructor, isAuthenticatedStudent, Login_Step, Otp_Step, Student_Details, Student_Role, Student_Token } from "lib/constants";
import { InstructorAuthAtom, StudentAuthAtom } from "store/atoms";
import { getErrorMessage } from "utils/common/error";
import Cookies from "js-cookie";
import { loginSuccess, logout  } from "../reducers/actionsCreators";

export const useInstructorLogin = () => {
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [, setOtpAtom] = useAtom(instructorOtpAtom);
  const setInstructorAtom = useSetAtom(instructorUserAtom);
  const [,dispatch] = useAtom(InstructorAuthAtom)

  const instructorLogin = useCallback(
    async (data) => {
      try {
        const response = await Client.Instructor.login(data);
        const { step, email, token, user } = response?.data;

        if (step === "otp") {
          setLoginStep(Otp_Step);
          setOtpAtom({ email, token });
          return { message: response?.message };
        } else {
          setOtpAtom({ email: null, token: null, otp: "" });
          // setInstructorAtom({
          //   isLoggedIn: true,
          //   userDetails: user,
          //   token: token,
          //   role: "instructor",
          // });
          setLoginStep(Login_Step);
          dispatch(loginSuccess({ userDetails:user,token,role:"instructor" }))
          const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
          compressAndStore(isAuthenticatedInstructor,true,expiryDate)
          compressAndStore(Instructor_Details,user,expiryDate)
          compressAndStore(Instructor_Token,token,expiryDate)
          compressAndStore(Instructor_Role,"instructor",expiryDate)
          return { success: true, message: response?.message };
        }
      } catch (error) {
        console.error("Login error:", error);
        const error_message = error?.response?.data?.message;
        throw new Error(error_message);
      }
    },
    [setLoginStep, setOtpAtom]
  );

  return instructorLogin;
};

export const useVerifyOTP = () => {
  const setOtpAtom = useSetAtom(instructorOtpAtom);
  const otpData = useAtomValue(instructorOtpAtom);
  const setInstructorAtom = useSetAtom(instructorUserAtom);
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [_,dispatch] = useAtom(InstructorAuthAtom)

  const verifyOTP = async (otp) => {
    try {
      const response = await Client.Instructor.verifyOtp({ ...otpData, otp });
      const { token, user } = response?.data;
      setOtpAtom({ email: null, token: null, otp: "" });
      // setInstructorAtom({
      //   isLoggedIn: true,
      //   userDetails: user,
      //   token: token,
      //   role: "instructor",
      // });
      dispatch(loginSuccess({ userDetails:user,token,role:"instructor" }))
      const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      compressAndStore(isAuthenticatedInstructor,true,expiryDate)
      compressAndStore(Instructor_Details,user,expiryDate)
      compressAndStore(Instructor_Token,token,expiryDate)
      compressAndStore(Instructor_Role,"instructor",expiryDate)

      setLoginStep(Login_Step);
      return { status: "success" };
    } catch (error) {
      throw error;
    }
  };

  return verifyOTP;
};

export const useStudentLogin = () => {
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const [, setOtpAtom] = useAtom(studentOtpAtom);
  const [, setStudentAtom] = useAtom(studentUserAtom);
  const [,dispatch] = useAtom(StudentAuthAtom)

  const studentLogin = useCallback(
    async (data) => {
      try {
        const response = await Client.Student.login(data);
        const { step, email, token, user } = response?.data;
        if (step === "otp") {
          setLoginStep(Otp_Step);
          setOtpAtom({ email, token });
        } else {
          setOtpAtom({ email: null, token: null, otp: "" });
          // setStudentAtom({
          //   isLoggedIn: true,
          //   userDetails: user,
          //   token: token,
          //   role: "student",
          // });
          dispatch(loginSuccess({user,token,role:"student"}))

          const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
          compressAndStore(isAuthenticatedStudent,true,expiryDate)
          compressAndStore(Student_Details,user,expiryDate)
          compressAndStore(Student_Token,token,expiryDate)
          compressAndStore(Student_Role,"student",expiryDate)

          setLoginStep(Login_Step);
          return { success: true };
        }
      } catch (error) {
        throw error;
      }
    },
    [setLoginStep, setOtpAtom]
  );
  return studentLogin;
};

export const useStudentOtpVerify = () => {
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const [, setOtpAtom] = useAtom(studentOtpAtom);
  const [, setStudentAtom] = useAtom(studentUserAtom);
  const otpData = useAtomValue(studentOtpAtom);
  const [,dispatch] = useAtom(StudentAuthAtom)

  const verifyOTP = async (otp) => {
    try {
      const response = await Client.Student.verifyOtp({
        ...otpData,
        otp,
      }); 
      const { token, user } = response?.data;
      setOtpAtom({ email: null, token: null, otp: "" });
      // setStudentAtom({
      //   isLoggedIn: true,
      //   userDetails: user,
      //   token: token,
      //   role: "student",
      // });
      
      dispatch(loginSuccess({user,token,role:"student"}))

      const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      compressAndStore(isAuthenticatedStudent,true,expiryDate)
      compressAndStore(Student_Details,user,expiryDate)
      compressAndStore(Student_Token,token,expiryDate)
      compressAndStore(Student_Role,"student",expiryDate)

      return response;
    } catch (error) {
      throw error;
    }
  };
  return verifyOTP;
};

export const useForgetPasswordOtpVerify = () => {
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const [, setOtpAtom] = useAtom(studentOtpAtom);
  const [, setStudentAtom] = useAtom(studentUserAtom);
  const otpData = useAtomValue(studentOtpAtom);

  const verifyOTP = async (otp) => {
    try {
      const response = await Client.Student.verifyOtp({
        ...otpData,
        otp,
      });
      const { token, user } = response?.data;
      setOtpAtom({ email: null, token: null, otp: "" });
      setStudentAtom({
        isLoggedIn: false,
        userDetails: user,
        token: token,
        role: "student",
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return verifyOTP;
};

export const useStudentforgetPassword = () => {
  const [, setOtpAtom] = useAtom(studentOtpAtom);
  
  const forgetPassword = async (email) => {
    try {
      const response = await Client.Student.forgetPassword({ email });
       setOtpAtom({ email, token: null, otp: " " });
      return response;
    } catch (error) {
      console.error("Error during password reset:", error);
      throw error;
    }
  };
  return forgetPassword;
};

export const useChangePassword = () => {
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const otpData = useAtomValue(studentOtpAtom);
  const [otpAtom, setOtpAtom] = useAtom(studentOtpAtom);
  
  const changePassword = async (confirmPassword) => {
    try {
      const response = await Client.Student.reset_password({
        email: otpAtom.email,
        otp: otpAtom.otp,
        token: otpAtom.token,
        confirmPassword,
      });
      setOtpAtom({ email: null, token: null, otp: "" });
      setLoginStep(Login_Step);
      return { success: true, message: response?.message };
    } catch (error) {
      console.error("Error setting new password:", error);
      throw error;
    }
  };

  return changePassword;
};



export const useInstructorforgetPassword = () => {
  const [, setOtpAtom] = useAtom(studentOtpAtom);

  const forgetPassword = async (email) => {
    try {
      const response = await Client.Student.forgetPassword({ email });
      setOtpAtom({ email, token: null, otp: " " });
      return response;
    } catch (error) {
      console.error("Error during password reset:", error);
      const error_message = getErrorMessage(error)
      throw error_message
    }
  };
  return forgetPassword;
};

export const useInstituteForgetPasswordOtpVerify = () => {
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [, setOtpAtom] = useAtom(instructorOtpAtom);
  const [, setInstructorAtom] = useAtom(instructorUserAtom);

  
  const otpData = useAtomValue(instructorOtpAtom);
  const verifyOTP = async (otp) => {
    try {
      const response = await Client.Student.verifyOtp({
        ...otpData,
        otp,
      });
      const { token, user } = response?.data;
      setOtpAtom({ email: null, token: null, otp: "" });
      setInstructorAtom({
        isLoggedIn: false,
        userDetails: user,
        token: token,
        role: "instructor",
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return verifyOTP;
};

export const useInstructorChangePassword = () => {
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [, setInstructorAtom] = useAtom(instructorUserAtom);
  const [otpAtom, setOtpAtom] = useAtom(instructorOtpAtom);

  const changePassword = async (data) => {
    try {
      const response = await Client.Student.reset_password({
        email: otpAtom.email,
        // otp: otpAtom.otp,
        // token: otpAtom.token,
        new_password : data?.new_password, 
        confirm_password : data?.confirm_password
      });

      setOtpAtom({ email: null, token: null, otp: "" });
      setLoginStep(Login_Step);
      return { success: true, message: response?.message };
    } catch (error) {
      const error_message = getErrorMessage(error)
      console.error("Error setting new password:", error);
      throw error_message
    }
  };

  return changePassword;
};

export const useInstructorLogout = () => {
   const [,setLoginStep] = useAtom(instructorLoginStepAtom)

   const instructorLogout = useCallback(
    async (data) => {
      try {
      await Client.Instructor.log_out(data)
      Cookies.remove(isAuthenticatedInstructor) 
      Cookies.remove(Instructor_Details)
      Cookies.remove(Instructor_Token)
      setLoginStep(Login_Step) 
      return { success: true, message : "Logout successfully"}
      } catch (error) {
        throw new Error(getErrorMessage(error))
      }
    },[setLoginStep])

   return instructorLogout
}

export const useStudentLogout = () => {
    const [,setLoginStep] = useAtom(studentLoginStepAtom)
   
  const studentLogout = useCallback(
    async(data) => {
      try {
       await Client.Student.logout()
       Cookies.remove(isAuthenticatedStudent)
       Cookies.remove(Student_Details)
       Cookies.remove(Student_Token)
       setLoginStep(Login_Step)
       return { success: true, message : "Logout successfully"}
      } catch (error) {
        throw new Error(getErrorMessage(error))
      }
    }
  )
  return studentLogout
}