// Core imports
import React, { useEffect } from "react";

// Custom and third-party component imports
import NavBar from "../components/NavBar";
import RecapCard from "../components/RecapCard";

// Recap data import
import { recaps } from "../JSONs/recaps";


// RecapPage component definition
function RecapPage() {
  // Scroll to top when the component is first mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Component render function
  return (
    <div className="page-body">
      <NavBar />
      <div className="content-body">
        <h1 className="header1">Orientation Recap</h1>
        <div className="recap-card-container margin-top-medium">
          {recaps.map((recap, index) => (
            <div key={index} className="margin-bottom-large">
              {/* RecapCard component for each recap item */}
              <RecapCard
                title={recap.title}
                description={recap.description}
                icon={recap.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Exporting RecapPage as the default export
export default RecapPage;
