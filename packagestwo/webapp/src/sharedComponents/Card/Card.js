import Styles from "./Card.module.css";
import Button from "@/sharedComponents/Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/modules/cart/cart.module";
import { useSelector } from "react-redux";

function Card({ product, onSelectProduct }) {
  const { items: categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const finalPrice = product.price?.final ?? product.price?.original;
  const categoryNames = product.categories
    ?.map((id) => categories.find((cat) => cat._id === id)?.name)
    .filter(Boolean)
    .join(", ");
  return (
    <div
      className={Styles.card}
      onClick={() => onSelectProduct(product._id)}
    >
      
      <div className={Styles.image}>
        <img
          src={product.image}
          alt={product.name}
          className={Styles.cardImg}
        />
      </div>

      
      <div className={Styles.content}>
        
        <span className={`text-xs text-primary ${Styles.category}`}>
            {categoryNames}
        </span>

        
        <h3 className={`${Styles.title}`}>
          {product.name}
        </h3>

         
        <p className={`text-sm ${Styles.description}`}>
          {product.description.slice(0, 35)}...
        </p>

         
        <div className={Styles.footer}>
          <div>
            <p className={`fw-bold mb-0 ${Styles.price}`}>{product.currency} {finalPrice}</p>
            <p className={`text-sm mb-0 ${Styles.originalPrice}`}>{product.currency} {product.price.original}</p>
          </div>

          <Button
            variant="secondary"
            iconOnly
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                addToCart({
                  productId: product._id,
                  quantity: 1,
                })
              );
            }}
            className={Styles.cartButton}
          >
            <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;