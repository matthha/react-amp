import { View } from "@aws-amplify/ui-react";
import { parse, stringify } from 'yaml';
// import fs from 'fs';
import text from '../YamlContent/Modules.yml'
import { useState } from "react";

function TestYaml(props) {
   const [content, setContent] =useState({})

   console.log(text)
   fetch(text)
   .then(r => r.text())
   .then(texts => {
      setContent(texts)
   });
   
   return (
      <>
      <View>
         <h1>Here is a title.</h1>
         <div>
            <h2>Header</h2>
            <p>I'm a paragraph!</p>
            <p>{JSON.stringify(parse(content))}</p>
         </div>
      </View>
      </>
   )
}
export default TestYaml;