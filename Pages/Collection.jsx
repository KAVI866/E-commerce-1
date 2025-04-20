import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import { Title } from '../Components/Title';
import { ProductItem } from '../Components/ProductItem';

export const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext);
  const[showFilter,setshowFilter]=useState(false);
  const[filterProducts,setfilterProducts]=useState([]);
  const[category,setCategory]=useState([]);
  const[subCategory,setsubCategory]=useState([]);
  const[sortType,setsortType]=useState('relavent');

// Category
  const toggleCategory=(event)=>{
    if(category.includes(event.target.value))
    {
      setCategory(prev=>prev.filter(item=> item !== event.target.value))
    }
    else
    {
      setCategory(prev => [...prev,event.target.value])
    }
  }
  //subCategory

  const togglesubCategory=(event)=>{
    if(subCategory.includes(event.target.value))
    {
      setsubCategory(prev=>prev.filter(item=> item !== event.target.value))
    }
    else
    {
      setsubCategory(prev => [...prev,event.target.value])
    }
  }

  const applyFilter= ()=>{
    let productsCopy=products.slice();
    if(showSearch && search)
    {
      productsCopy=productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0)
    {
      productsCopy=productsCopy.filter(item=> category.includes(item.category));
    }   
    if(subCategory.length > 0)
      {
        productsCopy=productsCopy.filter(item=> subCategory.includes(item.subCategory));
      }  
    setfilterProducts(productsCopy);
  }
  // Sort the product
  const sortProduct=()=>{
    let fpCopy=filterProducts.slice();
    switch(sortType)
    {
      case 'low-high':
        setfilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setfilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch]);
  useEffect(()=>{
    sortProduct();
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter optionn */}
      <div className='min-w-60'>
        <p onClick={()=>setshowFilter(!showFilter)} className='my-2 cursor-pointer text-xl flex items-center gap-2'>FILTERS
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} id='Men' onChange={toggleCategory} /> <label htmlFor='Men'>Men</label>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} id='Women' onChange={toggleCategory}/> <label htmlFor='Women'>Women</label>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} id='Kids' onChange={toggleCategory}/> <label htmlFor='Kids'>Kids</label>
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} id='Topwear' onChange={togglesubCategory}/> <label htmlFor='Topwear'>Topwear</label>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} id='Bottomwear' onChange={togglesubCategory}/> <label htmlFor="Bottomwear">Bottomwear</label>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} id='Winterwear' onChange={togglesubCategory}/>  <label htmlFor="Winterwear">Winterwear</label>
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-3xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product Sort */}
          <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>
        {/* Map Product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4  gap-y-6'>
           {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
           }
        </div>
      </div>
    </div>
  )
}
