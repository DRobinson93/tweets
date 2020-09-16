import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from "./UserProfile";
import MainPage from "./MainPage";

if (document.getElementById('Home')) {
    ReactDOM.render(<MainPage />, document.getElementById('Home'));
}

if (document.getElementById('UserProfile') && document.getElementById('UserId')) {
    const UserId = document.getElementById('UserId').getAttribute('value');
    const userOnPersonalPage = document.getElementById('userOnPersonalPage').getAttribute('value');
    ReactDOM.render(<UserProfile id={UserId} userOnPersonalPage={userOnPersonalPage} />, document.getElementById('UserProfile'));
}
