import React, {
  createContext,
  ReactNode,
  useState,
} from "react"

import {
  IAssignment,
  ICourse,
  IEvaluation,
  IJtp,
  IStudent,
  ISubmitted
} from "@models"

interface selectedContextValues {
  assignment?: IAssignment,
  course?: ICourse,
  evaluation?: IEvaluation,
  jtp?: IJtp,
  student?: IStudent,
  submitted?: ISubmitted,
  jtpEvaluation?: IEvaluation, // Agrega esta propiedad
  setAssignment: Function,
  setCourse: Function,
  setEvaluation: Function,
  setJtp: Function,
  setStudent: Function,
  setSubmitted: Function,
  setJtpEvaluation: Function,
}

const defaultValues = {
  setAssignment: () => {},
  setCourse: () => {},
  setEvaluation: () => {},
  setJtp: () => {},
  setStudent: () => {},
  setSubmitted: () => {},
  setJtpEvaluation: () => {},
}

export const SelectedContext = createContext<selectedContextValues>(defaultValues)

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
  const [jtp, setJtp] = useState<IJtp | undefined>()
  const [student, setStudent] = useState<IStudent | undefined>()
  const [assignment, setAssignment] = useState<IAssignment | undefined>()
  const [submitted, setSubmitted] = useState<ISubmitted | undefined>()
  const [course, setCourse] = useState<ICourse | undefined>()
  const [evaluation, setEvaluation] = useState<IEvaluation | undefined>()
  const [jtpEvaluation, setJtpEvaluation] = useState<IEvaluation | undefined>()

  return (
    <SelectedContext.Provider
      value={{
        assignment,
        course,
        evaluation,
        jtp,
        student,
        submitted,
        jtpEvaluation,
        setAssignment,
        setCourse,
        setEvaluation,
        setJtp,
        setStudent,
        setSubmitted,
        setJtpEvaluation,
      }}>
      {children}
    </SelectedContext.Provider>
  )
}
