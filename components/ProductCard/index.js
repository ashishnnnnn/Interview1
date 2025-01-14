import "./style.css"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function ProductCard(props){
    const {name,price,imageUrl,id} = props;
    const router = useRouter();

    const handleClick = ()=>{
        router.push(`/productPage/${id}`);
    }
    return(
        <div onClick={handleClick} className="card">
            <div className="imageContainer">
                <Image
                    layout="fill"
                    objectFit="fill"
                    className="image"
                    src={imageUrl}
                    alt="banner image"
                    onError={(e) =>
                        console.error('Image failed to load:', e.target.src)
                    }
                />
            </div>
            <div className="name">{name}</div>
            <div className="price">{price}</div>
            
        </div>
    )
}

export default ProductCard;