import { atom } from "jotai";
import { userAtom } from "store/atoms/authAtoms";

export const isAuthenticatedAtom = atom((get) => get(userAtom).isLoggedIn);

export const userDetailsAtom = atom((get) => get(userAtom).userDetails);
