import styled from 'styled-components';
import Input from './Input';
import WhiteBox from './WhiteBox';
import StarRating from './StarsRating';
import Textarea from './Textarea';
import Button from './Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
  `;
const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  @media(max-width: 768px){
    grid-template-columns: 1fr;
    gap: 20px;
    padding-bottom: 20px;
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding: 5px 0;
  h3{
    margin: 5px 0;
    font-size: 1rem;
    color: #333;
    font-weight: normal;
  }
  p{
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #555;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time{
    font-size: 12px;
    color: #aaa;
  }
`;

export default function ProductReviews({product}) {
  const {data: session} = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  
  function submitReview(){
    if (!session) {
      toast.error('You must log in to make review!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }); 
      return;
    }
    const data = {title,description,stars,product:product._id};
    axios.post('/api/reviews', data).then(res => {
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews();
    });
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews(){
    setReviewsLoading(true);
    axios.get('/api/reviews?product='+product._id).then(res => {
    setReviews(res.data);
    setReviewsLoading(false);
    });
  };
  return (
    <div>  
      <ToastContainer/>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div> 
          <WhiteBox>
          <Subtitle>Add a review</Subtitle>
          <div>
            <StarRating onChange={setStars}/> 
          </div> 
          <Input 
            placeholder='Title'
            value={title}  
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder='Did you like it?'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <Button 
              primary={1}
              onClick = {submitReview}
              >Submit</Button>
          </div>
        </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitle>All reviews</Subtitle>
            {reviewsLoading && (
              <Spinner/>
            )}
            {reviews.length === 0 &&(
              <p>No reviews yet</p>
            )}
            {reviews.length > 0 && reviews.map(review => (
              <ReviewWrapper key={review._id}>
                <ReviewHeader>
                  <StarRating 
                    size={'sm'} 
                    disabled={1} 
                    defaultHowMany={review.stars} 
                    />
                  <time>{(new Date(review.createdAt)).toLocaleString('nl-NL')}</time>
                </ReviewHeader>
                <h3>{review.title}</h3>
                <p>{review.description}</p>
              </ReviewWrapper>
            ))}
          </WhiteBox>
        </div>  
     </ColsWrapper>
    </div>
  );
}