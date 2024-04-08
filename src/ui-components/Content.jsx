const Content = (props) => {

   return (
      <div >
      {props?.content.map((x,i)=> {
         return (
         <>
            {x?.regular ?? <p>{x.regular}</p>}
            {x?.bold ?? <h1 className="header1">{x.bold}</h1>}
            {x?.underline ?? <div style={{ color: "#338888" }}>{x.underline}</div>}
            {x?.danger ?? <p style={{ color: "#338888" }}>{x.danger}</p>} 
         </>
         )  
      }
      )}
      </div>
   )
}
export default Content;