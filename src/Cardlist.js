import { React } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Cardlist = ({ list }) => {
  return (
    <div className="container">
      {list.map(({ id, name, img, avgrating, reviewcount }) => {
        const starStyle = {
          size: 30,
          value: parseFloat(avgrating),
          edit: false,
          isHalf: true,
        };
        return (
          <div key={id} className="item">
            <div className="logo">
              <img src={img} alt="airline-logo" />
            </div>
            <h3 style={{ margin: "0" }}>{name}</h3>
            <div
              style={{
                marin: "0",
                padding: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReactStars {...starStyle} />
              {parseFloat(avgrating).toFixed(1)}/5 ({reviewcount} users)
            </div>

            <div style={{ margin: "0.5rem" }}>
              <Link
                to={`/airlines/${id}`}
                className="btn"
                onClick={() => {
                  localStorage.setItem(
                    "curAirline",
                    JSON.stringify({ id, name, img, avgrating, reviewcount })
                  );
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cardlist;
