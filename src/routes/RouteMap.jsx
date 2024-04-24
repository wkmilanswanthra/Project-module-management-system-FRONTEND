import React from "react";
import Dashboard from "../pages/Dashboard";
import StudentsContainer from "../features/students/components/StudentsContainer";
import FacultyContainer from "../features/faculty/components/FacultyContainer";
import ProjectsContainer from "../features/project/components/ProjectsContainer";
import SemesterContainer from "../features/semester/components/SemesterContainer";
import MarksheetsContainer from "../features/marksheet/components/MarksheetsContainer";
import AssessmentsContainer from "../features/assessments/components/AssessmentsContainer";
import CreateAssessmentContainer from "../features/assessments/components/CreateAssessmentContainer";
import EditAssessmentContainer from "../features/assessments/components/EditAssessment";
import RubricsContainer from "../features/rubrics/components/RubricsContainer";
import CreateRubricsContainer from "../features/rubrics/components/CreateRubricsContainer";
import ScheduleContainer from "../features/schedule/components/ScheduleContainer";
import CreateSchedule from "../features/schedule/components/CreateSchedule";
import NewMarking from "../features/marks/components/NewMarking";
import GroupsContainer from "../features/groups/components/GroupsContainer";
import SubmissionsContainer from "../features/submissions/components/SubmissionsContainer";

import StudentsDashboard from "../pages/StudentsDashboard";
import AssessmentList from "../features/assessments/components/AssessmentList";
import Welcome from "../features/studentDashboard/components/Welcome";
import PublicationPage from "../features/publications/components/PublicationPage";
import ProjectPage from "../features/project/components/ProjectPage";
import CreateProject from "../features/project/components/CreateProject";
import AddPublication from "../features/publications/components/AddPublication";
import AssessmentContainer from "../features/assessments/components/AssessmentContainer";

import InitialPage from "../pages/InitialPage";
import WelcomeContainer from "../features/auth/components/WelcomeContainer";
import LoginContainer from "../features/auth/components/LoginContainer";
import StudentRegisterContainer from "../features/auth/components/StudentRegisterContainer";
import FacultyRegisterContainer from "../features/auth/components/FacultyRegisterContainer";
import VerifyEmailContainer from "./../features/auth/components/VerifyEmailContainer";

import { Roles } from "../assets/constants";

export const authRoutes = [
  {
    path: "/welcome",
    element: <InitialPage />,
    allowedRoles: [],
    childRoutes: [
      {
        path: "",
        element: <WelcomeContainer />,
        allowedRoles: [],
      },
      {
        path: "login",
        element: <LoginContainer />,
        allowedRoles: [],
      },
      {
        path: "signup",
        element: <StudentRegisterContainer />,
        allowedRoles: [],
      },
      {
        path: "faculty/signup",
        element: <FacultyRegisterContainer />,
        allowedRoles: [],
      },
      {
        path: "verify-email",
        element: <VerifyEmailContainer />,
        allowedRoles: [],
      },
    ],
  },
];

export const getRoutes = (hasProject) => {
  const routes = [
    {
      path: "",
      element: <Dashboard />,
      allowedRoles: [
        Roles.PROJECT_COORDINATOR,
        Roles.MEMBER,
        Roles.EXAMINER,
        Roles.SUPERVISOR,
        Roles.CO_SUPERVISOR,
        Roles.STAFF,
      ],
      childRoutes: [
        {
          path: "students",
          element: <StudentsContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR],
        },
        {
          path: "faculty",
          element: <FacultyContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR],
        },
        {
          path: "",
          element: <FacultyContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR],
        },
        {
          path: "projects",
          element: <ProjectsContainer />,
          allowedRoles: [
            Roles.PROJECT_COORDINATOR,
            Roles.SUPERVISOR,
            Roles.CO_SUPERVISOR,
          ],
        },
        {
          path: "assessments",
          element: <AssessmentsContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "submissions",
          element: <SubmissionsContainer />,
          allowedRoles: [
            Roles.PROJECT_COORDINATOR,
            Roles.EXAMINER,
            Roles.SUPERVISOR,
            Roles.CO_SUPERVISOR,
          ],
        },
        {
          path: "marksheets",
          element: <MarksheetsContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR],
        },
        {
          path: "semesters",
          element: <SemesterContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR],
        },
        {
          path: "rubrics",
          element: <RubricsContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "groups",
          element: <GroupsContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR],
        },
        {
          path: "assessments/create",
          element: <CreateAssessmentContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "assessments/edit/*",
          element: <EditAssessmentContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "rubrics/create",
          element: <CreateRubricsContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "schedule",
          element: <ScheduleContainer />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "schedule/create",
          element: <CreateSchedule />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "schedule/edit/:id",
          element: <CreateSchedule />,
          allowedRoles: [Roles.PROJECT_COORDINATOR, Roles.MEMBER],
        },
        {
          path: "marks/new/:id",
          element: <NewMarking />,
          allowedRoles: [
            Roles.PROJECT_COORDINATOR,
            Roles.EXAMINER,
            Roles.SUPERVISOR,
            Roles.CO_SUPERVISOR,
          ],
        },
        {
          path: "marks/update/:id",
          element: <NewMarking />,
          allowedRoles: [
            Roles.PROJECT_COORDINATOR,
            Roles.EXAMINER,
            Roles.SUPERVISOR,
            Roles.CO_SUPERVISOR,
          ],
        },
      ],
    },
    {
      path: "",
      element: <StudentsDashboard />,
      allowedRoles: [Roles.STUDENT],
      childRoutes: [
        {
          path: "",
          element: <Welcome project={hasProject} />,
          allowedRoles: [Roles.STUDENT],
        },
        {
          path: "create-project",
          element: <CreateProject />,
          allowedRoles: [Roles.STUDENT],
        },
      ],
    },
  ];

  const hasProjectPaths = [
    {
      path: "",
      element: <ProjectPage />,
      allowedRoles: [Roles.STUDENT],
    },
    {
      path: "assessments",
      element: <AssessmentList />,
      allowedRoles: [Roles.STUDENT],
    },
    {
      path: "assessment/:id",
      element: <AssessmentContainer />,
      allowedRoles: [Roles.STUDENT],
    },
    {
      path: "publications",
      element: <PublicationPage />,
      allowedRoles: [Roles.STUDENT],
    },
    {
      path: "add-publication",
      element: <AddPublication />,
      allowedRoles: [Roles.STUDENT],
    },
  ];
  if (hasProject) {
    routes[1].childRoutes = hasProjectPaths;
  }
  console.log(hasProject);
  console.log(routes);
  return routes;
};
// export default routes;
