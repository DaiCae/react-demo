import request from './request'

export const ProductFindApi = (params) => request.get('/product/', {params})

export const ProductFindByIdApi = (params) => request.get('/product/' + params)

export const ProductTotalApi = (params) => request.get('/product/total', {params})

export const ProductAddApi = (params) => request.post('/product/', params)

export const ProductUpdateApi = (params) => request.put('/product/', params)

export const ProductDeleteApi = (params) => request.delete('/product/' + params)

export const ProductDeleteBatchApi = (params) => request.delete('/product/', {data:params})
