import request from './request'

export const LoginApi = (params) => request.post('/login', params)

export const RegisterApi = (params) => request.post('/register', params)

export const UploadApi = (params) => request.post('/upload', params)

// Product API
export const ProductFindApi = (params) => request.get('/product/', {params})

export const ProductFindByIdApi = (params) => request.get('/product/' + params)

export const ProductTotalApi = (params) => request.get('/product/total', {params})

export const ProductAddApi = (params) => request.post('/product/', params)

export const ProductUpdateApi = (params) => request.put('/product/', params)

export const ProductDeleteApi = (params) => request.delete('/product/' + params)

export const ProductDeleteBatchApi = (params) => request.delete('/product/', {data:params})

// Category API
export const CategoryFindApi = (params) => request.get('/category/', {params})

export const CategoryFindByIdApi = (params) => request.get('/category/'+ params)

export const CategoryTotalApi = (params) => request.get('/category/total', {params})

export const CategoryAddApi = (params) => request.post('/category/', params)

export const CategoryUpdateApi = (params) => request.put('/category/', params)

export const CategoryDeleteApi = (params) => request.delete('/category/' + params)

export const CategoryDeleteBatchApi = (params) => request.delete('/category/', {data:params})