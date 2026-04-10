import React from "react";
import "./TestimonialSection.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Shubham Dwivedi",
    role: "Android/Web Developer",
    img: "https://lh3.googleusercontent.com/a/ACg8ocKCJyUP9uiC8oTUKLqUjAlKBIphgI3F0aZpkXggZZTCwYI=s360-c-no",
    review:
      "Aanchal Agarwal is a standout graphics designer and UI/UX professional. Her innovative designs elevate my Android apps with a perfect blend of creativity, functionality, and user appeal. Highly recommended!",
    rating: 4,
  },
  {
    id: 2,
    name: "Vasu Gupta",
    role: "Optus/Funingo Founder",
    img: "https://res.cloudinary.com/dbdj94yye/image/upload/v1704301085/creato-graphix-website/vasu-gupta.jpg",
    review:
      "Great Work, Timely Delivery, Amazing at Coordination. Anchal is really dedicated towards her craft and that gets reflected in the quality of work which she delivers.",
    rating: 5,
  },
  {
    id: 3,
    name: "Harvansh Sainy",
    role: "Brand Goyral",
    img: "https://cdn-icons-png.flaticon.com/512/2115/2115958.png",
    review:
      "For graphic design Anaya is best choice and for Goyral she is doing great jobs. All graphics are provided by her.",
    rating: 5,
  },
  {
    id: 4,
    name: "Manoneet Kumar",
    role: "Startupmed",
    img: "https://cdn-icons-png.flaticon.com/512/9307/9307803.png",
    review:
      "Aanchal has truly impressed us with their design skills. Quick, creative, and professional. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div id="testimonial">
      <div className="container">
        <h1 className="subti">Testimonials</h1>

        <section id="testimonials">
          <div className="testimonial-box-container">
            {TESTIMONIALS.map((item) => (
              <div className="testimonial-box" key={item.id}>
                
                <div className="box-top">
                  <div className="profile">
                    <div className="profile-img">
                      <img src={item.img} alt={item.name} />
                    </div>

                    <div className="name-user">
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </div>

                <div className="client-comment">
                  <p>{item.review}</p>
                </div>

                <div className="reviews">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={
                        i < item.rating
                          ? "fas fa-star"
                          : "far fa-star"
                      }
                    ></i>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        <a href="/submit-review" className="btn" target="_blank" rel="noreferrer">
          Add Review
        </a>
      </div>
    </div>
  );
}