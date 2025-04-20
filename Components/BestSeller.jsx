import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

export const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestSeller,setbestSeller]=useState([]);
    useEffect(()=>{
        const bestproduct=products.filter((item)=>(item.bestseller));
        setbestSeller(bestproduct.slice(0,5))
    },[])
  return (
    <div className='my-5'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, pariatur eaque non.
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
              bestSeller.map((item,index)=>(
                  <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
              ))
          }
        </div>
    </div>
  )
}
