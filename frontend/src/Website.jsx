import React, { useState } from "react";
import Calendar from "./Calendar.jsx";
import AssignmentInput from "./AssignmentInput.jsx";
import AssignmentList from "./AssignmentList.jsx";
import Deletion from "./Deletion.jsx";
import AddCourse from "./AddCourse.jsx";
import logo from "./logo.png";

function Website() {

    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState("");
    const [courses, setCourses] = useState([]);
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const [userName, setUserName] = useState("");
    const [confirmedUserName, setConfirmedUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setConfirmedUserName(userName);
        setUserName("");
        setPassword("");
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
    }

    const handleAddAssignment = () => {
        if (newAssignment.trim() !== "") {
            setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
            setNewAssignment("");
        }
    };

    const handleDeleteAssignment = (assignmentTitle) => {
        setAssignments((prevAssignments) => prevAssignments.filter((assignment) => assignment !== assignmentTitle));
    };

    return (
        <div>
            <img
                src={logo}
                alt="Logo"
                style={{
                    ...styles.logo,
                    left: isMenuOpen ? "300px" : "40px",
                    transition: "transform 0.2s ease",
                }}
            />

            <h1
                style={{
                    position: "absolute",
                    left: isMenuOpen ? "650px" : "500px",
                    transition: "transform 0.2s ease",
                }}>
                {isLoggedIn ? `${confirmedUserName}'s Calendar` : "My Calendar"}
            </h1>

            {!isLoggedIn && (
                <div>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        style={{
                            ...styles.userpass,
                            width: "150px",
                            top: "8px",
                        }}
                     />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{
                            ...styles.userpass,
                            paddingRight: "40px",
                            width: "118px",
                            top: "50px",
                        }}
                    />

                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.showhide}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
    
                    <button
                        style={{
                            ...styles.signin,
                            right: "127px",
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <button
                        style={{
                            ...styles.signin,
                            right: "40px",
                        }}
                        onClick={handleLogin}
                    >
                        Signup
                    </button>
                </div>
            )}

            {isLoggedIn && (
                <button 
                    style={styles.signout}
                    onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    onClick={handleSignOut}
                >
                    Sign out
                </button>
            )}

            <button
                style={styles.toggleButton}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div style={styles.line}></div>
                <div style={styles.line}></div>
                <div style={styles.line}></div>
            </button>

            <main style={styles.main}>
                <div style={styles.container}>

                    <div
                        style={{
                            ...styles.sideContainer,
                            transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
                            transition: "transform 0.2s ease",
                        }}
                    >
                        <h2>Assignments</h2>
                        <AssignmentInput
                            newAssignment={newAssignment}
                            setNewAssignment={setNewAssignment}
                            handleAddAssignment={handleAddAssignment}
                        />
                        <AssignmentList assignments={assignments} />
                        <Deletion onDrop={handleDeleteAssignment} />

                        <h2>Courses</h2>
                        <AddCourse
                            setCourses={setCourses}
                            currentWeekStart={currentWeekStart}
                        />

                        <h2>Custom</h2>

                        <br />
                        <br />
                    </div>

                    <div
                        style={{
                            ...styles.calendarContainer,
                            width: isMenuOpen ? "80%" : "100%",
                            marginLeft: isMenuOpen ? "22%" : "0",
                        }}
                    >
                        <Calendar 
                            assignments={assignments}
                            setAssignments={setAssignments}
                            handleDeleteFromCalendar={handleDeleteAssignment}
                            courses={courses}
                            setCurrentWeekStart={setCurrentWeekStart}
                        />
                        <br/>
                    </div>

                </div>
            </main>
        </div>
    );
}

const styles = {
    header: { padding: "0 40px" },
    logo: { position: "absolute", top: "5px", width: "150px", height: "150px" },
    main: { display: "flex", justifyContent: "center", padding: "0 40px", boxSizing: "border-box" },
    container: { position: "relative", width: "100%", display: "flex"},
    sideContainer: {
        position: "fixed",
        left: "0px",
        width: "20%",
        height: "100%",
        paddingLeft: "20px",
        paddingRight: "15px",
        paddingTop: "30px",
        backgroundColor: "#f0f0f0",
        overflowY: "scroll",
    },
    calendarContainer: { width: "80%", paddingTop: "160px" },
    toggleButton: {
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        zIndex: 10,
    },
    line: {
        width: "30px",
        height: "4px",
        backgroundColor: "#999999",
        borderRadius: "2px",
    },
    userpass: {
        padding: "8px",
        fontSize: "14px",
        marginBottom: "10px",
        textAlign: "left",
        display: "block",
        margin: "0 auto",
        marginTop: "10px",
        position: "absolute",
        right: "40px",
        zIndex: 20,
    },
    showhide: {
        padding: "3px",
        fontSize: "12px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        position: "absolute",
        top: "68px",
        right: "44px",
        zIndex: 20,
    },
    signin: {
        padding: "4px 6px",
        width: "83px",
        fontSize: "14px",
        color: "#2b2b2b",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        position: "absolute",
        top: "102px",
        zIndex: 20,
    },
    signout: {
        fontSize: "14px",
        color: "#707070",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        position: "absolute",
        top: "8px",
        right: "40px",
        zIndex: 20,
    },
};

export default Website;