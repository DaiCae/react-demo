import App from '../App'
import List from '../pages/List'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ListTable from '../pages/ListTable'
import Detail from '../pages/Detail'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const BaseRoute = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/list' element={<List />} />
                <Route path='/edit' element={<Edit />} />
                <Route path='/edit/:id' element={<Edit />}></Route>
                <Route path='/means' element={<Means />} />
                <Route path='/list' element={<Means />} />
                <Route path='/listtable' element={<ListTable />} />
                <Route path='/detail' element={<Detail />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    </Router>
)

export default BaseRoute