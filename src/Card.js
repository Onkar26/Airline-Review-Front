import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewList from "./ReviewList";
import Loading from "./Loading";
import StarRating from "./StarRating";

const { default: axios } = require("axios");

const Card = ({ users, curUser }) => {
  const [reviewList, setReviewList] = useState([]);
  const [airline, setAirline] = useState({ avgrating: 3, reviewcount: 1 });
  const [curUserReview, setCurUserReview] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [starVal, setStarVal] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const { name, img } = JSON.parse(localStorage.getItem("curAirline"));
  const curStar = {
    size: 40,
    count: 5,
    isHalf: false,
    value: starVal,
    color: "rgb(0,0,7)",
    activeColor: "rgb(255 194 0)",
    onChange: (newValue) => {
      setStarVal(newValue);
    },
  };
  const getAirlineReviews = async () => {
    const resp = await axios.get(`http://localhost:3000/review/${id}`);
    setReviewList(resp.data);
    if (resp.data) {
      setIsLoading(false);
      //   console.log(resp.data);
      const avg = resp.data.reduce((acc, val) => acc + parseInt(val.rating), 0);
      setCurUserReview(
        resp.data.filter((r) => r.username === curUser.username)
      );
      //   const userReview = resp.data.filter(
      //     (r) => r.username === curUser.username
      //   );
      //   console.log(avg, "avg");
      //   console.log(resp.data.length, "length");
      setAirline({
        ...airline,
        reviewcount: resp.data.length,
        avgrating: parseFloat(avg / resp.data.length).toFixed(1),
      });

      //   setHeading();
    }
    // console.log(resp.data);
  };
  const deleteReview = (reviewId) => {
    if (curUser.username === "") {
      setIsLoading(false);
      return;
    } else {
      axios.delete(`http://localhost:3000/review/${reviewId}`);
      setReviewList(reviewList.filter((review) => review.id !== reviewId));
      getAirlineReviews();
    }
    setHeading("");
    setDescription("");
  };
  const sendReview = async () => {
    const resp = await axios.post(`http://localhost:3000/review`, {
      heading: heading,
      description: description,
      username: curUser.username,
      airlineID: id,
      rating: starVal,
    });
    console.log(resp.data);
    if (resp.data) {
      getAirlineReviews();
    }
    setIsLoading(true);

    setHeading("");
    setDescription("");
  };

  const editReview = () => {
    axios.put(`http://localhost:3000/review`, {
      id: curUserReview.id,
      username: curUser.username,
      heading: heading,
      description: description,
      rating: starVal,
      airlineID: id,
    });
    getAirlineReviews();
  };

  useEffect(() => {
    getAirlineReviews();
  }, []);

  // useEffect(() => {
  //   console.log(heading, "---", description, "----------------", starVal);
  // }, [heading, description, starVal]);
  return (
    <div className="airlines">
      <div className="left">
        <div className="heading-airlines">
          <img
            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
            src={img}
            alt={name}
          />
          <h1>{name}</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p>{airline.reviewcount} User Reviews</p>
            <StarRating rating={Math.ceil(airline.avgrating)} />

            <p>{airline.avgrating} out of 5 stars</p>
          </div>
          <div
            style={{
              width: "40%",
              background: "#ccc",
              height: "2rem",
              margin: "0.3rem",
              borderRadius: "5px",
              color: "white",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.round(
                  (reviewList.length / users.length) * 100
                )}%`,
                backgroundColor: "rgb(3,3,44)",
                borderRadius: "5px",
                padding: "0.3rem",
              }}
            >
              {Math.round((reviewList.length / users.length) * 100)}% Users
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loading className="single-airline" />
        ) : (
          <ReviewList
            reviewList={reviewList}
            deleteReview={deleteReview}
            curUser={curUser}
          />
        )}
      </div>
      <div className="right">
        {curUser.username === "" ? (
          <>
            <h1 style={{ textAlign: "center" }}>
              Please login or sign up to add reviews
            </h1>
            <button>
              <Link to="/login">Login here</Link>
            </button>
            <button>
              <Link to="/signup">Sign Up here</Link>
            </button>
          </>
        ) : (
          <>
            <h4 style={{ textAlign: "center" }}>
              Have an experience with {name} ? Add your review!
            </h4>
            <input
              name="heading"
              value={heading}
              placeholder="Heading for review"
              onChange={(e) => {
                setHeading(e.target.value);
              }}
              style={{ height: "3rem" }}
            />
            <input
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description for review"
              style={{ height: "8rem" }}
            />
            <div
              style={{
                backgroundColor: "white",
                width: "90%",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <h3>Rate this Airline</h3>

              <ReactStars {...curStar} />
            </div>
            {curUserReview.length > 0 ? (
              <button onClick={editReview}>Edit</button>
            ) : (
              <button onClick={sendReview}>Submit</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
