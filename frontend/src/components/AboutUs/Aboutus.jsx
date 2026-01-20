import React, { useEffect, useRef, useState } from "react";

const aboutText = `Invictus is a flagship techfest that brings together innovation, creativity, and technology. Rooted in India's rich heritage and driven by a vision for the future, it provides a platform for students to ideate, build, and compete through hackathons, workshops, and technical events.`;

const Aboutus = () => {
  const [open, setOpen] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    // Trigger the unroll after mount
    const timer = setTimeout(() => setOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="aboutus-container">
      <div className="aboutus-scroller-wrapper">
        <div
          className={`aboutus-scroller-unroll${open ? " open" : ""}`}
          ref={scrollerRef}
        >
          <div className="aboutus-scroller">
            <span>{aboutText}&nbsp;&nbsp;&nbsp;</span>
            <span>{aboutText}&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
      <div className="aboutus-stats-horizontal">
        <div className="aboutus-stat">
          <span className="aboutus-icon">👥</span>
          <div className="aboutus-stat-number">20K+</div>
          <div className="aboutus-stat-label">Footfall</div>
        </div>
        <div className="aboutus-stat">
          <span className="aboutus-icon">🏢</span>
          <div className="aboutus-stat-number">200+</div>
          <div className="aboutus-stat-label">Colleges</div>
        </div>
        <div className="aboutus-stat">
          <span className="aboutus-icon">📅</span>
          <div className="aboutus-stat-number">80+</div>
          <div className="aboutus-stat-label">Events</div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
