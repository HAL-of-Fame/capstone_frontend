// import React from "react";

// export default function Product(props) {
//   const { product, onAdd } = props;
//   console.log("product", product)
//   return (
//     <div className="all">
//       <img
//         className="small"
//         src={product.image}
//         height={200}
//         width={200}
//         alt={product.name}
//       />
//       <h3>{product.name}</h3>
//       <div>${product.price}</div>
//       <div>
//         <button onClick={() => onAdd(product)} className="add">Add To Cart</button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Product(props) {
  const classes = useStyles();
  const { product, onAdd } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to="/shopping-cart/">
        <Button size="small" color="primary" onClick={() => onAdd(product)}>
          Add To Cart
        </Button>
      </Link>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
