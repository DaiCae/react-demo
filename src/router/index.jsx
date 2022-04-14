import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import App from '../App'
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import Default from '../pages/Default';
import ProductEdit from '../pages/product/Edit'
import ProductList from '../pages/product/ListTable'
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
                <Route path='/product/list' element={<ProductList />} />
            </Route>
        <Route path="/test" element={<Test />} />
        </Routes>
    </Router>
)

export default BaseRoute