import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Title } from './Title';
import { useState } from 'react';
import { useEffect } from 'react';
import { Product } from '../Pages/Product';
import { ProductItem } from './ProductItem';

export const LatestCollection = () => {
    const[latestProducts,setlatestProducts]=useState([]);
    const {products}=useContext(ShopContext);

    useEffect(()=>{
        setlatestProducts(products.slice(0,10));
    },[])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae
            </p>
        </div>
        {/* Rendering products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  gap-y-6'>
                {latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))}
        </div>
    </div>
  )
}
