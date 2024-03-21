import { View } from "@aws-amplify/ui-react";
import { parse } from 'yaml';
// import fs from 'fs';
import text from '../YamlContent/Modules.yml'
import { useEffect, useState } from "react";
import NavBar from "../ui-components/NavBar";

function TestYaml(props) {
   const [content, setContent] =useState({})
   // content = []
   useEffect(()=> {

   fetch(text)
   .then(r => r.text())
   .then(texts => {
      setContent(parse(texts))
      console.log('Content is',texts)
   });
   },[]) 
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