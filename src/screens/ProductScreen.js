import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
//   const product = products.find((p) => p._id === match.params.id);
const [product,setProduct] = useState({})
useEffect(()=>{
    const fetchProducts = async () =>{
        const {data} = await axios.get(`/api/product/${match.params.id}`)
        setProduct(data)
    }
    fetchProducts()
 },[])

  return (
    <>
      <a className="btn btn-dark my-3" href="/">
        Go to back
      </a>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid   alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} /> 
            </ListGroup.Item>
            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
                Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                <strong>{product.countInStock > 0 ? `In stock (${product.countInStock})` : 'Out of stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className="btn-block btn btn-dark" disabled={product.countInStock === 0} type="button">Add To Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
