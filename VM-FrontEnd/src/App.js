import "./App.css";
import { motion } from "framer-motion";

import Item from "./component/Item";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link,useNavigate } from 'react-router-dom';
import NewProject from "./NewProject";
import LoginPage from "./LoginPage";
import { ImUser } from "react-icons/im";
import { AiOutlineProject } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineOrderedList } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import Header from "./Header";
import Footer from "./Footer";



const Home = () => {
  return (
    <>
      <h1 className="header">Welcome To Virtual Manufacturing</h1>
      <h3>Virtual Manufacturing</h3>
      <p>...</p>
    </>
  );
};

const DashboardContent = () => {
  return (
    <>
      <h1 className="header"> DASHBOARD PAGE</h1>
      <h3>Welcome to Virtual Manufacturing</h3>
      <p>Track Forklift Vehicle movement in factory based on the input coordinates</p>
    </>
  );
};

const EditProfile = () => {
  return (
    <div>
      <h1>Edit Profile</h1>
      <br/>
      <h4>Development is in Progress</h4>

    </div>
  );
};

const ProjectList = () => {
  return (
    <div>
      <h1>Project List</h1>
      <br/>
      <h4>Development is in Progress</h4>

    </div>
  );
};


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const [open, setOpen] = useState(true);

  if (isLoggedIn) {

  // for collpsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
  };

  return (
    <Router>
      <div className="App">
        <motion.div
          data-Open={open}
          variants={sideContainerVariants}
          initial={`${open}`}
          animate={`${open}`}
          className="sidebar_container"
        >
          {/* sidebar div */}
          <motion.div
            className="sidebar"
            initial={`${open}`}
            animate={`${open}`}
            variants={sidebarVariants}
          >
            {/* lines_icon */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: 180,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(3.5px)",
                WebkitBackdropFilter: "blur(3.5px)",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                transition: {
                  delay: 0.2,
                  duration: 0.4,
                },
              }}
              onClick={handleToggle}
              className="lines_icon"
            >
              <BsFillArrowLeftSquareFill />
            </motion.div>
            <div className="groups">
              {/* group 1 */}
              <div className="group">
                 <h3>Virtual Manufacturing</h3>
              </div>
            </div>
            {/* groups */}
            <div className="groups">
              {/* group 1 */}
              <div className="group">
                <Link to="/dashboard" className="link">
                  <Item icon={<BiSolidDashboard />} name="Dashboard" />
                </Link>
              </div>
            </div>
            {/* group 2 */}
            <div className="group">
            
              <Link to="/newproject" className="link">
                <Item icon={<AiOutlineProject />} name="New Projects" />
               
              </Link>
            
            </div>
            {/* group 3 */}
            <div className="group">
             <Link to="/editprofile" className="link">
                <Item icon={<ImUser />} name="Edit Profile" />
              </Link>
            </div>
            <div className="group">
             <Link to="/" className="link" onClick={handleLogout}>
                <Item icon={<AiOutlineLogout />} name="Logout" />
              </Link>
            </div>
       
          </motion.div>
        </motion.div>

        <div className="body_container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="newproject" element={<NewProject/>} />
            <Route path="projectlist" element={<ProjectList />} />
            <Route path="editProfile" element={<EditProfile />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
} else {
  return (
    <div className="login_container">
      <LoginPage onLogin={handleLogin} />
  </div>

  );
}

};

export default App;
