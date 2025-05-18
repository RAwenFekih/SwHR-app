import React, { useRef } from "react";
import "./Testimonials.css";
import next_icon from "../../assets/next-icon.jpg";
import back_icon from "../../assets/back-icon.jpg";
import user_1 from "../../assets/user-1.jpeg";
import user_2 from "../../assets/user-2.jpg";
import user_3 from "../../assets/user-3.jpeg";
import user_4 from "../../assets/user-4.webp";

const Testimonials = () => {
  const slider = useRef();
  let tx = 0;
  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };
  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <div className="testimonials">
      <img src={next_icon} alt="" className="next-btn" onClick={slideForward} />
      <img
        src={back_icon}
        alt=""
        className="back-btn"
        onClick={slideBackward}
      />
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_1} alt="" />
                <div>
                  <h3>William Jackson</h3>
                  <span>
                    Deloitte. <br />
                    London, England <br />
                    457-600 employees
                  </span>
                </div>
              </div>
              <p>
                “We've struggled with HR platforms that were overly complex.
                SwHR has been a breath of fresh air. Its intuitive features and
                customization options have completely changed how we handle HR
                processes."
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_2} alt="" />
                <div>
                  <h3>Mohamed kande</h3>
                  <span>
                    PwC <br /> London, England <br /> 200-300 employees
                  </span>
                </div>
              </div>
              <p>
                "Before SwHR, I had to juggle multiple tools—spreadsheets,
                QuickBooks, and calendars—just to get simple tasks done. Now,
                everything is centralized, saving us 70 hours per month on HR
                workflows alone."
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_3} alt="" />
                <div>
                  <h3>Wafa Najahi</h3>
                  <span>
                    Sintegra Consulting <br /> Tunis, Tunisia <br />
                    50-294 employees
                  </span>
                </div>
              </div>
              <p>
                "SwHR is not a problem looking for a solution - it is an actual
                solution. It is seamless, and all encompassing. It's genuinely
                progressive. Your team actually tends to anticipate the needs
                before we even ask."
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="" />
                <div>
                  <h3>Immen Chatti</h3>
                  <span>
                    MEDAF HR <br /> Sousse, Tunisia <br />
                    10-49 employees
                  </span>
                </div>
              </div>
              <p>
                "SwHR makes it easy to manage recruitment across our team, even
                when hiring 25 new staff per month. I can start a candidate in
                the hiring funnel, and someone else can finish the process
                without missing a beat."
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
