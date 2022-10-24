import React from 'react'
import {
  AssignmentsPage,
  AccountPage,
  EvaluationsPage,
  StatsPage,
  AdminsPage,
  StudentsPage,
  JtpsPage,
  LoginPage,
  OverviewPage,
} from '@pages'

export const paths = {
  account: '/account',
  overview: '/overview',
  login: '/login',
  assignments: {
    list: '/assignments/list',
    stats: '/assignments/stats',
    evaluations: '/assignments/evaluations',
  },
  users: {
    admins: '/users/admins',
    jtps: '/users/jtp',
    students: '/users/students',
  },
}

export const routes = {
  account: { path: paths.account, element: <AccountPage /> },
  overview: { path: paths.overview, element: <OverviewPage /> },
  login: { path: paths.login, element: <LoginPage/> },
  assignments: {
    list: { path: paths.assignments.list, element: <AssignmentsPage /> },
    stats: { path: paths.assignments.stats, element: <StatsPage /> },
    evaluations: { path: paths.assignments.evaluations, element: <EvaluationsPage /> },
  },
  users: {
    admins: { path: paths.users.admins, element: <AdminsPage /> },
    jtps: { path: paths.users.jtps, element: <JtpsPage /> },
    students: { path: paths.users.students, element: <StudentsPage /> },
  },
}
