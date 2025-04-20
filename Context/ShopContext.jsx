import { createContext, useEffect, useState } from "react";
import {products} from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const currency='$';
    const delivery_fee=10;
    const[search,setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false);
    const[cartItems,setCartItems]=useState({});
    const navigate=useNavigate();

    const addToCart=async(ItemId,size)=>{ 
        if(!size)
        {
            toast.error('Select Product Size');
            return;
        }
        let cartData=structuredClone(cartItems);//clone the cartitem we use structuredClone because it is object
        if(cartData[ItemId])
        {
            if(cartData[ItemId][size])
            {
                cartData[ItemId][size]+=1;
            }
            else
            {
                cartData[ItemId][size]=1;
            }
        }
        else
        {
            cartData[ItemId]={};
            cartData[ItemId][size]=1;
        }
        setCartItems(cartData);
        console.log(cartData);
        
    }


    // const addToCart = async (ItemId, ItemPrice, size) => {
    //     if (!size) {
    //       toast.error('Select Product Size');
    //       return;
    //     }
      
    //     let cartData = structuredClone(cartItems); // safely clone cart
      
    //     if (!cartData[ItemId]) {
    //       cartData[ItemId] = {};
    //     }
      
    //     if (cartData[ItemId][size]) {
    //       cartData[ItemId][size].quantity += 1
    //      // cartData[ItemId][size].price *=2; this is used to update quantity and price 
    //     } else {
    //       cartData[ItemId][size] = {
    //         price: ItemPrice,
    //         quantity: 1
    //       };
    //     }
      
    //     setCartItems(cartData);
    //     console.log(cartData);
    //   };
      
   const getCartCount=()=>{
    let totalCount=0;
    for(const items in cartItems)
    {
        for(const item in cartItems[items])
        {
           try {
                if(cartItems[items][item]>0)
                {
                    totalCount +=cartItems[items][item];
                }
                
            } catch (error) {
            }
         }
    }
     return totalCount;
   }

   const updataQuantity=async(ItemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[ItemId][size]=quantity;
        setCartItems(cartData);
        console.log(cartData);
        
   }
   const getCartAmount=()=>{
    let totalAmount=0;
    for(const items in cartItems)
    {
        let iteminfo=products.find((product)=>product._id === items);
        for(const item in cartItems[items])
        {
            try {
                if(cartItems[items][item])
                {
                    totalAmount += iteminfo.price * cartItems[items][item];
                }
            } catch (error) {
                
            }
        }
    }
    return totalAmount;
   }
    const value={
        products,navigate,currency,delivery_fee,search,getCartAmount,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount,updataQuantity
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider