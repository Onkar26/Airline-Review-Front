import React from "react";
import ReactStars from "react-rating-stars-component";
const ReviewList = ({ reviewList, deleteReview, curUser }) => {
  console.log(reviewList);
  return (
    <div className="review-container">
      {reviewList.map((item) => {
        const starStyle = {
          size: 20,
          value: parseFloat(item.rating),
          edit: false,
          isHalf: true,
        };
        return (
          <div key={item.id} className="review">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0.5rem 0",
              }}
            >
              <img
                style={{ borderRadius: "50%", marginRight: "0.3rem" }}
                width="25px"
                height="25px"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="logo"
              />
              <ReactStars {...starStyle} />
              <h4 style={{ marginLeft: "0.3rem" }}>{item.username}</h4>
              {curUser.username === item.username && (
                <span
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                  className="material-symbols-rounded"
                  onClick={() => {
                    deleteReview(item.id);
                  }}
                >
                  delete
                </span>
              )}
              {/* {curUser === username ? (
                <span
                  style={{ position: "absolute", top: "5px", right: "35px" }}
                  className="material-symbols-rounded"
                >
                  edit
                </span>
              ) : (
                ""
              )} */}
            </div>
            <div>
              <h3 style={{ margin: "0.4rem 0" }}>{item.heading}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
