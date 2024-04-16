 const Content = (props) => {
  return (
    <div className="content"> {/* Adjust the base font size and line height as needed */}
      {props?.content.map((x, i) => (
        <span key={i} style={{ display: 'inline'}}> {/* Inline display with custom margin */}
          {x.regular && <span>{x.regular} </span>}
          {x.bold && <span style={{ fontWeight: 600 }}>{x.bold} </span>}
          {x.underline && <span style={{ textDecoration: "underline" }}>{x.underline} </span>}
          {x.link && <a href={x.link}>{x.link} </a>} {/* Style links explicitly */}
          {x.danger && <span style={{ fontWeight: "bold", color: "#FF0000", backgroundColor: "#FFE0E0", padding: "5px", borderRadius: "5px" }}>{x.danger} </span>}
          {x.break && <br />}
          {x.tab && <span style={{margin:0, display:"inline",paddingLeft:'1.5em'}} />} {/* Use inline-block for tab spaces */}
        </span>
      ))}
    </div>
  );
};
 
 export default Content;
 