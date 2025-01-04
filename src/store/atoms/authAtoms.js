import { atom } from "jotai";
import Cookies from "js-cookie";
import { InstructorOtp, Instructor_Login_Step, Login_Step, Student, StudentOtp, Student_Login_Step, instructorDetails } from "lib/constants";
import LZString from "lz-string"
import { compressAndStore, getAndDecompress } from "utils/auth_helpers";


export const studentLoginStepAtom = atom(
  getAndDecompress(Student_Login_Step,Login_Step) ,
  (get, set, newLoginStep) => {
    set(studentLoginStepAtom, newLoginStep);
    const expiryDate = new Date(new Date().getTime() + 10 * 60 * 1000);
    compressAndStore(Student_Login_Step,newLoginStep,expiryDate)
  },
);

const initialStudent = () => {
  const student = Cookies.get(Student);
  return student
    ? JSON.parse(student)
    : { isLoggedIn: false, userDetails: null, token: null, role: null };
};

export const studentUserAtom = atom(initialStudent(), (get, set, newUser) => {
  set(studentUserAtom, newUser);
  const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  // setCookieWithExpiry(Student,JSON.stringify(newUser))
  Cookies.set(Student, JSON.stringify(newUser),{ expires: expiryDate});
});

export const studentOtpAtom = atom(
  getAndDecompress(StudentOtp) || { email: null, token: null, otp: null },
  (get, set, newOtp) => {
    set(studentOtpAtom, newOtp);
    compressAndStore(StudentOtp,newOtp,1/144)
  },
);

export const instructorLoginStepAtom = atom(
  getAndDecompress(Instructor_Login_Step) || Login_Step,
  (get, set, newLoginStep) => {
    set(instructorLoginStepAtom, newLoginStep);
    // setCookieWithExpiry("instructorLoginStep", newLoginStep);
    const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    compressAndStore(Instructor_Login_Step,newLoginStep,expiryDate)
  },
);

const initialUserState = () => {
  const storedUser = Cookies.get("instructorUser");
  return storedUser
    ? JSON.parse(storedUser)
    : { isLoggedIn: false, userDetails: null, token: null, role: null };
};

export const instructorUserAtom = atom(
  initialUserState(),
  (get, set, newUser) => {
    set(instructorUserAtom, newUser);    
    const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    Cookies.set(instructorDetails, JSON.stringify(newUser), {
      expires: expiryDate,
    });
  },
);

export const instructorOtpAtom = atom(
  getAndDecompress(InstructorOtp,{ email: null, token: null, otp: null }) ,
  (get, set, newOtpData) => {
    set(instructorOtpAtom, newOtpData);
    compressAndStore(InstructorOtp,newOtpData,1/144)
  },
);

export const removeUserCookie = (role) => {
  Cookies.remove(`${role}User`);
  Cookies.remove(`${role}LoginStep`);
  Cookies.remove(`${role}Otp`);
};
