import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

const portfolioItems = [
  { id: 1,  category: "logo",         src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/funingologo.jpg",          alt: "funingologo" },
  { id: 2,  category: "logo",         src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/jklogomarblelogo.png",     alt: "JKlogo" },
  { id: 3,  category: "logo",         src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/paramparalogo.jpg",        alt: "paramparalogo" },
  { id: 4,  category: "logo",         src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/shopminelogo.jpg",         alt: "shopminelogo" },
  { id: 5,  category: "logo",         src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/shoeboxxlogo.png",         alt: "shoeboxxlogo" },
  { id: 6,  category: "logo",         src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/footlightlogo.jpg",        alt: "footlightlogo" },
  { id: 7,  category: "logo",         src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/golujifoundationlogo.png", alt: "golujifoundationlogo" },
  { id: 8,  category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/achieverpost.jpg",         alt: "achieverpost" },
  { id: 9,  category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/crackCAT.jpg",             alt: "CrackCAT" },
  { id: 10, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/doyouwish.jpg",            alt: "Doyouwish" },
  { id: 11, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/coderhouse.jpg",           alt: "Coderhouse" },
  { id: 12, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/instastoryganeshji.jpg",   alt: "ganeshji" },
  { id: 13, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/pathtoiims.jpg",           alt: "path" },
  { id: 14, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/internshipprogram.jpg",    alt: "intern" },
  { id: 15, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/whatnext.jpg",             alt: "whatnext" },
  { id: 16, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/waterparkposter.jpg",      alt: "wpark" },
  { id: 17, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/waterparkpost2.jpg",       alt: "wpark2" },
  { id: 18, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/waterparkpost3.jpg",       alt: "waterparkpost3" },
  { id: 19, category: "poster",       src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/codingcontest.png",        alt: "codingcontest" },
  { id: 20, category: "businesscard", src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/siddharthjain.jpg",        alt: "siddharthjainvcard" },
  { id: 21, category: "businesscard", src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/shoeboxx.jpg",             alt: "shoeboxxvcard" },
  { id: 22, category: "businesscard", src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/hpwebmart.jpg",            alt: "hpwebmartvcard" },
  { id: 23, category: "businesscard", src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/brolabs.jpg",              alt: "brolabsvcard" },
  { id: 24, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/kbc.jpg",                  alt: "kbcpost" },
  { id: 25, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/jawedhabib.jpg",           alt: "jawedhabibpost" },
  { id: 26, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/humanfoundation.jpg",      alt: "humanfoundationpost" },
  { id: 27, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/radheproduction.jpg",      alt: "radheproductionpost" },
  { id: 28, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/prayagrajinfluencer.jpg",  alt: "prayagrajinfluencerpost" },
  { id: 29, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/organhospital.jpg",        alt: "organhospitalpost" },
  { id: 30, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/hrtrends.jpg",             alt: "hrtrendspost" },
  { id: 31, category: "socialpost",   src: "https://res.cloudinary.com/dbdj94yye/image/upload/q_auto/v1704306845/creato-graphix-portfolio/gmat.jpg",                 alt: "gmatpost" },
];

const filters = [
  { label: "All",              value: "all" },
  { label: "Logo Designs",     value: "logo" },
  { label: "Poster Designs",   value: "poster" },
  { label: "Social Media Post",value: "socialpost" },
  { label: "Business Card",    value: "businesscard" },
  { label: "Infographics",     value: "infographics" },
];

const OUT_DURATION = 250; // ms — must match CSS mixOut duration

export default function Portfolio() {
  const [activeFilter, setActiveFilter]   = useState("all");
  const [visibleIds, setVisibleIds]       = useState(() => portfolioItems.map((i) => i.id));
  const [exitingIds, setExitingIds]       = useState([]);
  const [enteringIds, setEnteringIds]     = useState([]);
  const [lightboxSrc, setLightboxSrc]     = useState(null);
  const transitioning = useRef(false);

  const getFilteredIds = (filter) =>
    filter === "all"
      ? portfolioItems.map((i) => i.id)
      : portfolioItems.filter((i) => i.category === filter).map((i) => i.id);

  const handleFilter = (filter) => {
    if (filter === activeFilter || transitioning.current) return;
    transitioning.current = true;

    const nextIds = getFilteredIds(filter);

    // Items currently shown that won't be in next set → exit
    const toExit = visibleIds.filter((id) => !nextIds.includes(id));
    // Items in next set that aren't currently shown → enter
    const toEnter = nextIds.filter((id) => !visibleIds.includes(id));

    setExitingIds(toExit);
    setActiveFilter(filter);

    setTimeout(() => {
      // After exit animation, swap the grid
      setVisibleIds(nextIds);
      setExitingIds([]);
      setEnteringIds(toEnter);

      // Clear entering class after animation completes
      setTimeout(() => {
        setEnteringIds([]);
        transitioning.current = false;
      }, 400);
    }, OUT_DURATION);
  };

  // On mount, trigger enter for all items
  useEffect(() => {
    setEnteringIds(portfolioItems.map((i) => i.id));
    const t = setTimeout(() => setEnteringIds([]), 400);
    return () => clearTimeout(t);
  }, []);

  const getItemClass = (id) => {
    let cls = "portfolio-grid-item";
    if (exitingIds.includes(id)) cls += " mix-out";
    else if (enteringIds.includes(id)) cls += " mix-in";
    return cls;
  };

  // Stagger delay for entering items
  const getEnterDelay = (id) => {
    if (!enteringIds.includes(id)) return {};
    const idx = enteringIds.indexOf(id);
    return { animationDelay: `${idx * 30}ms` };
  };

  return (
    <section className="portfolio-section" id="portfolio">
      <h2>Project Gallery</h2>

      <div className="portfolio-menu">
        <nav>
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`control outline${activeFilter === f.value ? " active" : ""}`}
              onClick={() => handleFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </nav>
      </div>

      <ul className="portfolio-grid">
        {visibleIds.map((id) => {
          const item = portfolioItems.find((i) => i.id === id);
          return (
            <li
              key={item.id}
              className={getItemClass(item.id)}
              style={getEnterDelay(item.id)}
            >
              <img src={item.src} alt={item.alt} />
              <div className="portfolio-overlay">
                <div
                  className="magnify-icon"
                  onClick={() => setLightboxSrc(item.src)}
                  title="Click to zoom-in"
                >
                  <i className="fa-solid fa-eye" aria-hidden="true" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {lightboxSrc && (
        <div className="lightbox-backdrop" onClick={() => setLightboxSrc(null)}>
          <button className="lightbox-close" onClick={() => setLightboxSrc(null)}>
            &times;
          </button>
          <img
            className="lightbox-img"
            src={lightboxSrc}
            alt="zoomed"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}