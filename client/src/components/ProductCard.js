import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-bootstrap'
const ProductCard = ({ product }) => {
  return (
    <>
      <div className='food-card'>
        <div className='food-card_img'>
          <img src={product.image.url} alt='' />
          <a href='#!'>
            <FontAwesomeIcon icon={faHeart} />
          </a>
        </div>
        <div className='food-card_content'>
          <div className='food-card_title-section'>
            <a href='#!' className='food-card_title'>
              {product.title}
            </a>
            <a href='#!' className='food-card_author'>
              Burger
            </a>
          </div>
          <div className='food-card_bottom-section'>
            <div className='space-between'>
              <div>
                <span className='fa fa-fire'></span> 220 - 280 Kcal
              </div>
              <div className='pull-right'>
                <span className='badge badge-success'>Veg</span>
              </div>
            </div>
            <hr />
            <div className='space-between'>
              <div className='food-card_price'>
                <span>5.99$</span>
              </div>
              <div className='food-card_order-count'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <button
                      className='btn btn-outline-secondary minus-btn'
                      type='button'
                      id='button-addon1'
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                  <input
                    type='text'
                    className='form-control input-manulator'
                    placeholder=''
                    aria-label='Example text with button addon'
                    aria-describedby='button-addon1'
                    value='0'
                  />
                  <div className='input-group-append'>
                    <button
                      className='btn btn-outline-secondary add-btn'
                      type='button'
                      id='button-addon1'
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
