// Content component definition
// This component is responsible for rendering styled text segments based on the properties provided in each object of the 'content' array.
const Content = (props) => {
  return (
    // Main container with a general text style applied
    <div className="body-text-2">
      {/* Mapping over the 'content' array received through props. 
          Each item 'x' represents a different text segment with possible styling options. */}
      {props?.content.map((x, i) => (
        <span key={i}> {/* Key is important for React's rendering optimization */}
          {/* If the 'regular' property exists, it displays the text without any special styling */}
          {x.regular && <span> {x.regular} </span>}
          
          {/* If the 'bold' property is provided, it applies a bold styling class to the text */}
          {x.bold && <span className="bold"> {x.bold} </span>}
          
          {/* If the 'underline' property is provided, it applies an underline styling class */}
          {x.underline && <span className="text-underline"> {x.underline} </span>}
          
          {/* If the 'link' property is provided, it renders the text as a hyperlink */}
          {x.link && <a href={x.link}> {x.link} </a>}
          
          {/* If the 'danger' property is provided, it applies bold styling and a semantic red color class */}
          {x.danger && <span className="bold color-semantic-red"> {x.danger} </span>}
          
          {/* If the 'break' property is provided, it inserts a line break */}
          {x.break && <br />}
          
          {/* If the 'tab' property is provided, it renders a span with a tab class which can be used to add horizontal spacing */}
          {x.tab && <span className="tab"/>}
        </span>
      ))}
    </div>
  );
};

// Export the Content component to be available for use in other parts of the application
export default Content;
