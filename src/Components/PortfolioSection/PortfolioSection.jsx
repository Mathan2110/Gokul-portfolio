import React from "react";
import "./PortfolioSection.css";

const WORKS = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704308098/creato-graphix-portfolio/shoeboxxlogo.png",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704308297/creato-graphix-portfolio/footlightlogo.jpg",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704307797/creato-graphix-portfolio/shopminelogo.jpg",
  },
];

export default function PortfolioSection() {
  return (
    <div id="Portfolio">
      <div className="container">
        <h1 className="subti">Portfolio</h1>

        <div className="worklist">
          {WORKS.map((work) => (
            <div className="work" key={work.id}>
              <img src={work.img} alt="portfolio work" />
            </div>
          ))}
        </div>
      </div>

      <div className="view-more">
        <a href="/portfolio" className="btn">
          View More
        </a>
      </div>
    </div>
  );
}