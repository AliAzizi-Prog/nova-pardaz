import React, { useCallback } from 'react';
import { useRequest } from 'ahooks';
import { deleteProducts } from 'src/api/api';

const useDeleteProducts = () => {

  const { runAsync: fetchDeleteProduct, loading: deleteProductLoading } = useRequest(
    deleteProducts,
    {
      manual: true,
      onSuccess(data: any) {
      },
      onError(error: any) {},
    }
  );

  const deleteProductHandler = useCallback(()=>{
    
  })
  return {}
};

export default useDeleteProducts;
