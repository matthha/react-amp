const Content = (props) => {

   return (
      <div className="content" >
      {props?.content.map((x,i)=> {
         return (
         <span key={i}>
            {x?.regular ?? <p>{x.regular}</p>}
            {x?.bold ?? <h1 className="header4">{x.bold}</h1>}
            {x?.underline ?? <div style={{ color: "#338888" }}>{x.underline}</div>}
            {x?.danger ?? <p style={{ color: "#999999" }}>{x.danger}</p>} 
         </span>
         )  
      }
      )}
      </div>
   )
}
export default Content;