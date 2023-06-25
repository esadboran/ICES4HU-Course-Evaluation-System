import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Mypage from './components/Mypage';
import About from './components/About';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import ForgotPassword from "./components/ForgotPassword";
import ViewProfile from "./components/ViewProfile";
import ManageProfile from "./components/ManageProfile";
import AddInstructors from "./components/admin/AddInstructors";
import ManageOthersAccounts from "./components/admin/ManageOthersAccounts";
import ListUsers from "./components/admin/ListUsers";
import EnableStudent from "./components/admin/EnableStudent";
import ListSemester from "./components/admin/CourseAndSemester/ListSemester";
import DefineSemester from "./components/admin/CourseAndSemester/DefineSemester";
import UpdateCourse from "./components/admin/CourseAndSemester/UpdateCourse";
import ShareDocuments from "./components/department_manager/ShareDocuments";
import AssignInstructors from "./components/department_manager/AssignInstructors";
import AssignStudents from "./components/instructor/AssignStudents";
import DownloadDocuments from "./components/instructor/DownloadDocuments";
import MyCourses from "./components/student/MyCourses";
import CreateSurvey from "./components/instructor/CreateSurvey";
import MySurveys from "./components/student/MySurveys";
import SurveySolution from "./components/student/SurveySolution";
import EditSurvey from "./components/instructor/EditSurvey";
import ListSavedSurveys from "./components/instructor/ListSavedSurveys";
import AcceptSurveys from "./components/admin/AcceptSurveys";
import ListResultsAll from "./components/department_manager/ListResultsAll";
import ViewResultsAll from "./components/department_manager/ViewResultsAll";
import ListResults from "./components/instructor/ListResults";
import ViewResults from "./components/instructor/ViewResults";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
                <Route path="/mypage" element={<Mypage />}></Route>
                <Route path="/mypage/viewprofile" element={<ViewProfile />}></Route>
                <Route path="/mypage/manageprofile" element={<ManageProfile />}></Route>
                <Route path="/registration" element={<Registration />}></Route>
                <Route path="/about" element={<About />} />
                <Route path="/mypage/admin/addinstructors" element={<AddInstructors />} />
                <Route path="/mypage/admin/listusers" element={<ListUsers />} />
                <Route path="/mypage/admin/manageothersaccounts" element={<ManageOthersAccounts />} /> /* Çalışmıyor 5.24*/
                <Route path="/mypage/admin/enablestudent" element={<EnableStudent />} /> /
                <Route path="/mypage/admin/listsemester" element={<ListSemester />} />/* Frontendi Değişcek */
                <Route path="/mypage/admin/definesemester" element={<DefineSemester />} />
                <Route path="/mypage/admin/updatecourse" element={<UpdateCourse />} />/* Tamam 5.00 */
                <Route path="/mypage/depman/uploaddocument" element={<ShareDocuments />} />
                <Route path="/mypage/depman/assigninstructor" element={<AssignInstructors />} />
                <Route path="/mypage/instructor/assignstudent" element={<AssignStudents />} />
                <Route path="/mypage/instructor/createsurvey" element={<CreateSurvey />} />
                <Route path="/mypage/instructor/listsurveys" element={<ListSavedSurveys />} />
                <Route path="/mypage/instructor/downloaddocuments" element={<DownloadDocuments />} />
                <Route path="/mypage/student/mycourses" element={<MyCourses />} />
                <Route path="/mypage/student/mysurveys" element={<MySurveys />} />
                <Route path="/mypage/student/surveysolution" element={<SurveySolution />} />/
                <Route path="/mypage/instructor/editsurvey" element={<EditSurvey />} />
                <Route path="/mypage/admin/acceptsurveys" element={<AcceptSurveys />} />
                <Route path="/mypage/depman/listresultsall" element={<ListResultsAll />} />/*dashboarda eklendi*
                <Route path="/mypage/depman/viewresultsall" element={<ViewResultsAll />} />
                <Route path="/mypage/instructor/listresults" element={<ListResults />} />/*dashboarda eklencek*
                <Route path="/mypage/instructor/viewresults" element={<ViewResults />} />
            </Routes>
        </Router>
    );
};
export default App;
