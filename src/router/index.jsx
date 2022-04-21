import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../App'
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import Default from '../pages/Default';
import ProductEdit from '../pages/Product/Edit'
import ProductList from '../pages/Product/ListTable'
import ProdcutDetail from '../pages/Product/Detail';
import CategoryEdit from '../pages/Category/Edit'
import CategoryList from '../pages/Category/ListTable'
import UserModify from '../pages/User/Modify'

import Test from '../pages/Test';
const BaseRoute = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/' element={<App />}>
                <Route path='/' element={<Default />} />
                <Route path='/product/edit' element={<ProductEdit />} />
                <Route path='/product/edit/:id' element={<ProductEdit />} />
                <Route path='/product/detail/:id' element={<ProdcutDetail />} />
                <Route path='/product/list' element={<ProductList />} />
                <Route path='/category/edit' element={<CategoryEdit />} />
                <Route path='/category/edit/:id' element={<CategoryEdit />} />
                <Route path='/category/list' element={<CategoryList />} />
                <Route path='/user/modify' element={<UserModify />} />
            </Route>
            <Route path="/test" element={<Test />} />
        </Routes>
    </Router >
)

export default BaseRoute