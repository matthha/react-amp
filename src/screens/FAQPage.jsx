// Importing the FAQ data from a JSON file located in a specific directory
import faqs from '../JSONs/faqs.json';  

// Importing necessary React elements and custom components
import React, { useEffect } from "react";
import NavBar from "../components/NavBar";  // Navigation bar component
import FAQAccordion from "../components/FAQAccordion";  // Accordion component for displaying FAQs

// FAQPage functional component definition
function FAQPage() {
  // useEffect hook to scroll to the top of the page on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Render method of the FAQPage component
  return (
    <div className="page-body">
      <NavBar /> {/*  Navigation bar at the top of the page */}
      <div className="content-body">
        <h1 className="header1 margin-bottom-medium">FAQ</h1>  {/* FAQ Section Heading */}
        {faqs.map((faq, index) => (
          // Mapping over each FAQ item and rendering it using the FAQAccordion component
          <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

// Exporting FAQPage as the default export of this module
export default FAQPage;
