const Content = (props) => {
   return (
     <reg className="content">
       {props?.content.map((x, i) => (
         <reg key={i}>
           {x.regular && <>{x.regular} </>}
           {x.bold && <b style={{fontWeight: 600}}>{x.bold} </b>}
           {x.underline && <reg style={{ textDecoration: "underline"}}>{x.underline} </reg>}
           {x.link && <a href={x.link}>{x.link} </a>}
           {x.danger && <reg style={{ fontWeight: "bold", color: "#FF0000", backgroundColor: "#FFE0E0", padding: "5px", borderRadius: "5px" }}>{x.danger} </reg>}
           {x.break && <br></br>}
           {x.tab && <pre style={{margin:0, display:"inline",paddingLeft:'1.5em'}}></pre>}
         </reg>
       ))}
     </reg>
   );
 };
 
 export default Content;
 