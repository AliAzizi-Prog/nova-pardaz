import React, {  useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { getAllProduct } from 'src/api/api';

const useGetProduct = () => {
  const [allProducts, setAllProducts] = useState([])

  const { runAsync:fetchAllProduct , loading:fetchAllProductLoading  } = useRequest(
    getAllProduct,
    {
      manual: true,
      onSuccess(data: any) {
        setAllProducts(data.data);
      },
      onError(error: any) {},
    }
  );

    useEffect(()=>{
      fetchAllProduct()
    },[])

  return{
    allProducts,
    fetchAllProduct,
    fetchAllProductLoading
  }

};

export default useGetProduct;
