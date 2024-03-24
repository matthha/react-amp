import { View } from "@aws-amplify/ui-react";
// import { parse } from 'yaml';
import { content as theYaml } from "../JSONs/Modules.js";
// import fs from 'fs';
import Quiz from "./Quiz.jsx"
import { useEffect, useState } from "react";
import NavBar from "../ui-components/NavBar";
import { useLocation } from "react-router-dom";

function TestYaml(props) {
   const [content, setContent] =useState({});
   const location = useLocation();
   
   useEffect(() => {

    }, []);
   return (
      <>
      <View>
         <NavBar />
         <Quiz />

         <div>
            <h2>Header</h2>
            <p>I'm a paragraph!</p>
            {/* <p>{JSON.stringify(content)}</p> */}
         </div>
      </View>
      </>
   )
}
export default TestYaml;