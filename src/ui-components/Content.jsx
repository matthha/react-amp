const Content = (props) => {
   return (
     <div className="content contentBox">
       {props?.content.map((x, i) => (
         <span key={i}>
           {x.regular && <p>{x.regular}</p>}
           {x.bold && <p style={{fontWeight: 600}}>{x.bold}</p>}
           {x.underline && <p style={{ textDecoration: "underline"}}>{x.underline}</p>}
           {x.link && <a href={x.link}>{x.link}</a>}
           {x.danger && <p style={{ fontWeight: "bold", color: "#FF0000", backgroundColor: "#FFE0E0", padding: "5px", borderRadius: "5px" }}>{x.danger}</p>}
         </span>
       ))}
     </div>
   );
 };
 
 export default Content;
 