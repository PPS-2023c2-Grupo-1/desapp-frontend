import { useDispatch } from 'react-redux'
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
} from '@store'

const updateStore = () => {
  const user = selectAuthenticatedUser()
  const dispatch = useDispatch()

  if(user?.hasOwnProperty('course')) {
    dispatch(getSubmittedByJtp())
    dispatch(getEvaluationsByJtp())
    dispatch(getAssignmentsByJtp())
    dispatch(getStudentsByCourse())
    dispatch(getCourses())
  } else {
    dispatch(getAdmins())
    dispatch(getJtps())
    dispatch(getSubmitted())
    dispatch(getEvaluations())
    dispatch(getAssignments())
    dispatch(getCourses())
    dispatch(getStudents())
  }
}

const tryAuthenticateFromLocalStorage = () => {
  const dispatch = useDispatch()
  const user = localStorage.getItem("user")
  const token = localStorage.getItem("token")
  
  if (token && user) {
    dispatch(setUser(JSON.parse(user)))
    dispatch(setToken(token))
    dispatch(login())
  }
}

export const useAuth = () => {
  const token = selectToken()

  if (token) { updateStore() }
  else { tryAuthenticateFromLocalStorage() }

  return !!token
}