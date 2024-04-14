import React, { useEffect, useState } from "react";
import { recaps } from '../JSONs/recaps';

import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import NavBar from "../ui-components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHandshake,
  faBook,
  faTshirt,
  faClock,
  faLaptop,
  faBus
} from "@fortawesome/free-solid-svg-icons";

import {Card} from "antd";
const { Meta } = Card;
// Import other icons here if needed and use them as intended
const iconMapping = {
  FaHandshake: faHandshake, // Assuming the correct icon name is faHandshake
  FaBook: faBook, // Correct as is
  FaTshirt: faTshirt, // Correct as is
  FaClock: faClock, // Assuming the correct icon name is faClock
  FaLaptop: faLaptop, // Correct as is
  FaBus: faBus // Correct as is
};

function RecapPage(props) {
  const navigate = useNavigate();
  useEffect(()=> {window.scrollTo(0, 0)},[])
  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <NavBar />
      <div className="contentBody">
        <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
          <h1 className="header1">Orientation Recap</h1>
          <div className="recapCardContainer" style={{paddingTop: 30}}>
            {recaps.map((recap, index) => (
              <div
                key={index}
                style={{
                  marginRight: 30,
                  marginBottom: 20,
                }}
              >
                <MenuCard title={recap.title} description={recap.description} icon={iconMapping[recap.icon]}/>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title, description, icon }) {
    const navigate = useNavigate();
    const onArrowClick = () => {
      navigate(`/recapcontent/${title}`);  // Pass the module title as a parameter
    };
    return (
        <div className="recapCardDisplay">
          <div className="recapIconDisplay">
          <FontAwesomeIcon icon={icon} className="infoIconStyle" />
            <div className="recapTitleDisplay">
              <div className="header3">{title}</div>
              <div className="header4">{description}</div>
            </div>
            </div>
            <RightOutlined className="rightArrowStyle" onClick={onArrowClick} />
            <button className="goButton" onClick={onArrowClick}>Explore Courses</button>
        </div>
    );
  }



export default RecapPage;
