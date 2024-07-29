import { atom } from "jotai";
import Cookies from "js-cookie";
import { Student, instructorDetails } from "lib/constants";

const setCookieWithExpiry = (key, value) => {
  const expiryDate = new Date(new Date().getTime() + 10 * 60 * 1000);
  Cookies.set(key, value, { expires: expiryDate });
};

const getCookieJSON = (key) => {
  const value = Cookies.get(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error(`Error parsing cookie ${key}:`, e);
    return null;
  }
};

export const studentLoginStepAtom = atom(
  Cookies.get("studentLoginStep") || "login",
  (get, set, newLoginStep) => {
    set(studentLoginStepAtom, newLoginStep);
    setCookieWithExpiry("studentLoginStep", newLoginStep);
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
  getCookieJSON("studentOtp") || { email: null, token: null },
  (get, set, newOtp) => {
    set(studentOtpAtom, newOtp);
    setCookieWithExpiry("studentOtp", JSON.stringify(newOtp));
  },
);

export const instructorLoginStepAtom = atom(
  Cookies.get("instructorLoginStep") || "login",
  (get, set, newLoginStep) => {
    set(instructorLoginStepAtom, newLoginStep);
    setCookieWithExpiry("instructorLoginStep", newLoginStep);
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
  getCookieJSON("instructorOtp") || { email: null, token: null },
  (get, set, newOtpData) => {
    set(instructorOtpAtom, newOtpData);
    Cookies.set("instructorOtp", JSON.stringify(newOtpData), {
      expires: 1 / 144,
    });
  },
);

export const removeUserCookie = (role) => {
  Cookies.remove(`${role}User`);
  Cookies.remove(`${role}LoginStep`);
  Cookies.remove(`${role}Otp`);
};
