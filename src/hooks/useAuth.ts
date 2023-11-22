import React from "react";
import { useDispatch } from "react-redux";
import {
  getAdmins,
  getAssignments,
  getAssignmentsByJtp,
  getCourses,
  getEvaluations,
  getEvaluationsByJtp,
  getJtps,
  getStudents,
  getStudentsByCourse,
  getSubmitted,
  getSubmittedByJtp,
  login,
  selectAuthenticatedUser,
  selectToken,
  setToken,
  setUser,
} from "@store";

export const useAuth = () => {

  const updateStore = (dispatch: any, user: any) => {
    
    if (user?.hasOwnProperty("course")) {
      dispatch(getSubmittedByJtp());
      dispatch(getEvaluationsByJtp());
      dispatch(getAssignmentsByJtp());
      dispatch(getStudentsByCourse());
      dispatch(getCourses());
    } else {
      dispatch(getAdmins());
      dispatch(getJtps());
      dispatch(getSubmitted());
      dispatch(getEvaluations());
      dispatch(getAssignments());
      dispatch(getCourses());
      dispatch(getStudents());
    }
  };

  const tryAuthenticateFromLocalStorage = (dispatch: any) => {
    
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && user) {
      dispatch(setUser(JSON.parse(user)));
      dispatch(setToken(token));
      dispatch(login());
    }
  };

  console.log("Hola estoy antes del useDispatch");
  const dispatch = useDispatch();
  console.log("estoy en medio del useDispatch y selecToken")
  const token = selectToken();
  console.log(token);
  const user = selectAuthenticatedUser(); 
  // todos los hooks tiene que empezar con use.
  // cambiar nombre a useSelectAuthenticatedUser()
  console.log(user);
  
  if (token) {
    console.log("useAuth con token");
    updateStore(dispatch, user);
  } else {
    console.log("useAuth SIN token");
    tryAuthenticateFromLocalStorage(dispatch);
  }

  return !!token;
};
