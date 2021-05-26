import React, { useEffect } from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import RoomsContainer from './main/rooms_container'
import Splash from './main/splash';
import Modal from './modal/modal';
import socketIOClient from 'socket.io-client';
import { io } from 'socket.io-client';
// import Game from './games/Game';



const App = () => {

    useEffect( () => {
        const socket = io()
        socket.on("test", (test) => {
            console.log("message from server", test);
        })
    }, []);

    return (

        <div>
            <Modal />
            <NavBarContainer />
            <Switch>
                <Route exact path="/" component={Splash} />
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />
                <ProtectedRoute path="/rooms" component={RoomsContainer} />
                {/* <Route exact path="/game" component={Game}/> */}
            </Switch>
        </div>
    )
};

export default App;