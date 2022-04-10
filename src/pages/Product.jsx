import React from 'react'
import { ProductApi } from '../request/api'

export default function Product() {
    const onClick = (values) =>{
        ProductApi({
            name: values.name
        })
    }
  return (
    <div>Product</div>
  )
}
