import ButtonCounter from './components/ButtonCounter';
import Navbar from "./components/Navbar";
import Racers from './components/Racers';
import RacersClass from './components/RacersClass';
import { Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import AlertMessage from './components/AlertMessage';
import Register from './components/Register';
import Login from './components/Login';
import NewPost from './components/NewPost';
import ListPost from './components/ListPost';

function App(props) {
    const now = new Date();
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration')) > now) ? true:false)

    const flashMessage = (message, category) => {
        setMessage(message);
        setCategory(category);
    }

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        setLoggedIn(false)
    }

    return (
        <>
            <Navbar logout={logout}/>
            <div className='container'>
            {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                <Routes>
                    <Route path='/' element={<ButtonCounter />}/>
                    <Route path='/standings' element={<RacersClass />}/>
                    <Route path='/register' element={<Register flashMessage={flashMessage}/>} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} login={login}/>} />
                    <Route path='/newpost' element={<NewPost flashMessage={flashMessage} loggedIn={loggedIn}/>} />
                    <Route path='/listpost' element={<ListPost flashMessage={flashMessage} loggedIn={loggedIn}/>} />
                </Routes>
            </div>
        </>
    )
}

export default App;
