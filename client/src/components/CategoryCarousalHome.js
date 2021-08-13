import React, { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import pizza from '../image/pizza.png'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { listCategory } from '../actions/categoryActions'

const CategoryCarousalHome = ({ setCatSlug }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listCategory())
  }, [dispatch])
  //showCategory list
  const categoryList = useSelector((state) => state.categoryList)
  const { categories, error: errorCategory } = categoryList

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  }
  return (
    <div>
      {errorCategory && <Message variant='alert'>{errorCategory}</Message>}
      <Slider {...settings}>
        {categories &&
          categories.map((c) => (
            <div key={c._id}>
              <div
                style={{
                  backgroundColor: '#f6e58d',
                  padding: '10px',
                  margin: '0px 10px',
                }}
                className='d-flex flex-column justify-content-center align-items-center'
                onClick={() => {
                  setCatSlug(c.slug)
                }}
              >
                <img src={pizza} alt='' className='img-fluid w-50' />
                <small style={{ color: '#000' }}>{c.name}</small>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  )
}

export default CategoryCarousalHome
