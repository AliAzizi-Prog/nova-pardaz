import { useRequest } from "ahooks";
import { useState } from "react";
import { createProduct } from "src/api/api";



const useCreateProduct = () =>{
const [product, setProduct] = useState()
  const { run:postProductData , loading:postProductDataLoading  } = useRequest(
    createProduct,
    {
      manual: true,
      onSuccess(data: any) {
        setProduct(data);
      },
      onError(error: any) {},
    }
  );

  // const postDataHandler = () =>{
  //   postProductData({
  //     body:{
  //       name:name,
  //       image:image,
  //     }
  //   })
  // }

  return {
    product,
    postProductDataLoading,

  };
};
export default useCreateProduct;
