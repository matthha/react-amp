import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import NavBar from "../ui-components/NavBar";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import {
  Drawer,
  Menu,
  Card,
  Progress,
  Row,
  Col,
} from "antd";
const { Meta } = Card;
// Import other icons here if needed and use them as intended
function RecapPage(props) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">Orientation Recap</h1>
        <div style={{paddingTop: 30}}>
            <MenuCard title="Introduction" description="Description for Introduction" />
            <MenuCard title="Curriculum" description="Description for Curriculum" />
            <MenuCard title="Policy" description="Description for Policy" />
            <MenuCard title="Dress Code" description="Description for Dress Code" />
            <MenuCard title="Transportation" description="Description for Transportation" />
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title, description }) {
    const navigate = useNavigate();
    const onArrowClick = () => {
        // Assuming `navigateTo` is the path to which you want to navigate
        navigate('/recapcontent');
      };
    return (
      <Card className="cardStyle">
        {/* <Meta
          title={<div className="titleStyle">{title}</div>}
          description={description}
          style={{ fontWeight: 'bold' }}
        /> */}
        <div style={{ display: 'flex' , alignItems:"space-around", width: 300}}>
            <InfoCircleOutlined className="infoIconStyle" />
            <div className="contentStyle">
                <div className="titleStyle">{title}</div>
                <div>{description}</div>
            </div>
            <RightOutlined className="rightArrowStyle" onClick={onArrowClick} />
        </div>
    
      </Card>
    );
  }



export default RecapPage;
