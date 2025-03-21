import React from "react";
import { BsStarFill } from "react-icons/bs";

interface Review {
  rating: number;
  name: string;
  date: string;
  text: string;
  id: string;
}

const Reviews: React.FC = () => {
  const reviewsData: Review[] = [
    {
      rating: 5,
      name: "Elliot",
      date: "January 3, 2023",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: 5,
      name: "Sandy",
      date: "December 12, 2022",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
  ];
  
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-3xl font-bold">Your reviews</h2>
        <p className="text-gray-600">
          Last <span className="font-medium">30 days</span>
        </p>
      </div>
      
      <img
        className="w-full h-64 object-contain bg-white p-4 rounded-lg shadow-sm mb-8"
        src="/assets/images/reviews-graph.png"
        alt="Review graph"
      />
      
      <h3 className="text-xl font-bold mb-4">Reviews (2)</h3>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {reviewsData.map((review, index) => (
          <div key={review.id} className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex mb-1">
                {[...Array(review.rating)].map((_, i) => (
                  <BsStarFill className="text-yellow-400 mr-1" key={i} />
                ))}
              </div>
              <div className="flex space-x-4 text-gray-600">
                <p className="font-medium">{review.name}</p>
                <p>{review.date}</p>
              </div>
              <p className="text-gray-800">{review.text}</p>
            </div>
            {index < reviewsData.length - 1 && (
              <hr className="my-4 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;