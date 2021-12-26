import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
function HomeScreen({ history }) {
    // 1.useDispatch is used to dispatch our action
    const dispatch = useDispatch()
    // 6.this (productList) is coming from store, which has three thing error, loading & products.
    const productList = useSelector(state => state.productList)
    //restructuring productList 
    const {error, loading, products, page, pages} = productList
    
    let keyword = history.location.search
    // 2.useDispatch is calling action(listProducts)
    useEffect(() =>{
        //"PRODUCT_LIST_REQUEST"("type") is ingested into listProducts, which will hit reducer having "PRODUCT_LIST_REQUEST"
        dispatch(listProducts(keyword))
    },[dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel />}
            <h1>Latest products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                    <Row>
                        {products.map(product=>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
            
        </div>
    )
}

export default HomeScreen
