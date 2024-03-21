import { View } from "@aws-amplify/ui-react";
import { parse } from 'yaml';
// import fs from 'fs';

import { useEffect, useState } from "react";
import NavBar from "../ui-components/NavBar";

function TestYaml(props) {
   const [content, setContent] =useState({})
   // content = []
   useEffect(() => {
      fetch(require('../YamlFiles/Modules.yml'))
        .then(r => r.text())
        .then(texts => parse(texts))
        .then(cons => {
          if (!Array.isArray(cons)) {
            console.error('Parsed data is not an array:', cons);
            return; // Don't set orientationModules if cons isn't an array
          }
         //  setOrientationModules(cons);
          console.log(cons)
        })
        .catch(error => {
          console.error('Error fetching or parsing the YAML content:', error);
        });
    }, []);
   return (
      <>
      <View>
         <NavBar />
         <h1>Here is a title.</h1>
         <div>
            <h2>Header</h2>
            <p>I'm a paragraph!</p>
            <p>{JSON.stringify(content)}</p>
         </div>
      </View>
      </>
   )
}
export default TestYaml;