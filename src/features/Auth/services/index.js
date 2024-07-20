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

export const useInstructorLogin = () => {
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [, setOtpAtom] = useAtom(instructorOtpAtom);
  const setInstructorAtom = useSetAtom(instructorUserAtom);

  const instructorLogin = useCallback(
    async (data) => {
      try {
        const response = await Client.Instructor.login(data);
        const { step, email, token, user } = response?.data;

        if (step === "otp") {
          setLoginStep("otp");
          setOtpAtom({ email, token });
          return { message: response?.message };
        } else {
          setOtpAtom({ email: null, token: null, otp: "" });
          setInstructorAtom({
            isLoggedIn: true,
            userDetails: user,
            token: token,
            role: "instructor",
          });
          setLoginStep("login");
          return { success: true, message: response?.message };
        }
      } catch (error) {
        console.error("Login error:", error);
        const error_message = error?.response?.data?.message;
        console.log(error_message, "errorMessage");
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

  const verifyOTP = async (otp) => {
    try {
      const response = await Client.Instructor.verifyOtp({ ...otpData, otp });
      const { token, user } = response?.data;
      setOtpAtom({ email: null, token: null, otp: "" });
      setInstructorAtom({
        isLoggedIn: true,
        userDetails: user,
        token: token,
        role: "instructor",
      });
      setLoginStep("login");
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
  const studentLogin = useCallback(
    async (data) => {
      try {
        const response = await Client.Student.login(data);
        const { step, email, token, user } = response?.data;
        if (step === "otp") {
          setLoginStep("otp");
          setOtpAtom({ email, token });
        } else {
          setOtpAtom({ email: null, token: null, otp: "" });
          console.log(typeof(email),typeof(token),typeof(user))
          setStudentAtom({
            isLoggedIn: true,
            userDetails: user,
            token: token,
            role: "student",
          });
          console.log(user,token)
          setLoginStep("login");
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

  const verifyOTP = async (otp) => {
    try {
      const response = await Client.Student.verifyOtp({
        ...otpData,
        otp,
      }); 
      const { token, user } = response?.data;
      setOtpAtom({ email: null, token: null, otp: "" });
      setStudentAtom({
        isLoggedIn: true,
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

export const useStudentNewPassword = () => {
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const [, setOtpAtom] = useAtom(studentOtpAtom);

  const setNewPassword = async ({ email, newPassword, otp }) => {
    try {
      const response = await Client.Student.setNewPassword({
        email,
        newPassword,
        otp,
      });
      setOtpAtom({ email: null, token: null, otp: "" });
      setLoginStep("login");
      return { success: true, message: response?.message };
    } catch (error) {
      console.error("Error setting new password:", error);
      throw error;
    }
  };

  return setNewPassword;
};

export const useStudentLogout = () => {};
