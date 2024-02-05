import React, {useContext} from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from './CartContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    color: 'white',
  },
}));
const WhiteShoppingCartIcon = styled(ShoppingCartIcon)({
  color: '#aaa',
});

export default function CartMaterialUI() {
  const { cartProducts } = useContext(CartContext);
  return (
    <IconButton aria-label="cart" style={{verticalAlign: 'middle'}}>
      <StyledBadge badgeContent={cartProducts.length} color="primary">
        <WhiteShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
