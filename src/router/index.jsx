import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import App from '../App'
import Login from '../pages/Login/Login';
import Default from '../pages/Default';
import ProductEdit from '../pages/product/Edit'
import ProductList from '../pages/product/ListTable'
const BaseRoute = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<App />}>
                <Route path='/' element={<Default />} />
                <Route path='/product/edit' element={<ProductEdit />} />
                <Route path='/product/edit/:id' element={<ProductEdit />} />
                <Route path='/product/list' element={<ProductList />} />
            </Route>
        </Routes>
    </Router>
)

export default BaseRoute