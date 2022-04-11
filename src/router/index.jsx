import App from '../App'
import ProductEdit from '../pages/product/Edit'
import ProductList from '../pages/product/ListTable'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const BaseRoute = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/product/edit' element={<ProductEdit />} />
                <Route path='/product/edit/:id' element={<ProductEdit />}></Route>
                <Route path='/product/list' element={<ProductList />} />
            </Route>
        </Routes>
    </Router>
)

export default BaseRoute