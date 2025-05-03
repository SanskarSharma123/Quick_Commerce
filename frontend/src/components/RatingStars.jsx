import React from "react";
import "../css/RatingStars.css";

const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="rating-stars">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="star full">★</span>
            ))}
            {hasHalfStar && <span className="star half">★</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="star">☆</span>
            ))}
        </div>
    );
};

export default RatingStars;