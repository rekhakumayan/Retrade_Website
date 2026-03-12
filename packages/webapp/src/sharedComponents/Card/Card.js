import Styles from "./Card.module.css";
import Button from "@/sharedComponents/Button/Button";

function Card({ product, onSelectProduct }) {
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
           {product.categories?.map(cat => cat.name).join(", ")}
        </span>

        
        <h3 className={`${Styles.title}`}>
          {product.name}
        </h3>

         
        <p className={`text-sm ${Styles.description}`}>
          {product.description.slice(0, 35)}...
        </p>

         
        <div className={Styles.footer}>
          <div>
            <p className={`fw-bold mb-0 ${Styles.price}`}>${product.price.final}</p>
            <p className={`text-sm mb-0 ${Styles.originalPrice}`}>${product.price.original}</p>
          </div>

          <Button
            variant="secondary"
            iconOnly
            onClick={(e) => e.stopPropagation()}
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