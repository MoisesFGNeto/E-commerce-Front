import styled from 'styled-components';

const StyledOrder = styled.div`
  background-color: #eee;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  align-items: center;
  display: flex;
  gap: 20px;
  time{
    color: #555;
    font-size: 1rem;
    margin-left: 5px;
  }
`;
const ProductRow = styled.div`
 span{
    color: #aaa;
 }
`;
const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
   margin: 10px;
   color: #888;
`;
export default function SingleOrder({line_items, createdAt, ...rest}) {
  return (
    <StyledOrder>
      <div>
        <time>{(new Date(createdAt)).toLocaleString('en-UK')}</time>
        <Address>
          {rest.name}<br/>
          {rest.email}<br/>
          {rest.streetAddress}<br/>
          {rest.city} {rest.postalCode}, {rest.country}
          
        </Address>
      </div>
      <div>
        {line_items.map(item => (
          <ProductRow key={item._id}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}