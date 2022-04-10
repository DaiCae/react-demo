import App from '../App'
import List from '../pages/List'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const BaseRoute = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/list' element={<List />} />
                <Route path='/edit' element={<Edit />} />
                <Route path='/means' element={<Means />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    </Router>
)

export default BaseRoute