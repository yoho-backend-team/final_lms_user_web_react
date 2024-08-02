import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils"
import { StudentAuthReducer, InstructorAuthReducer, initialStudentState, initialInstructorState } from "features/Auth/reducers";


export const InstructorAuthAtom = atomWithReducer(initialInstructorState,InstructorAuthReducer)
export const StudentAuthAtom = atomWithReducer(initialStudentState,StudentAuthReducer)