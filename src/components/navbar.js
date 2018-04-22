import React from 'react';
import PropTypes from 'prop-types';

function markAsSelected(id) {
    document.querySelectorAll(".bg-secondary").forEach(card => card.setAttribute("class", "card"));
    document.getElementById(id).setAttribute("class", "card text-white bg-secondary");
}

function Navbar({ users, selectUser }) {
    return (
        <div className="container col-2">
        {users.map(user => {
            const name = user[0];
            const id = user[1];
            return (
                <div
                    key={id} 
                    id={id} 
                    className="card" 
                    style={{width: "10rem"}} 
                    onClick={() => {
                        markAsSelected(id); 
                        return selectUser(id, name);
                    }
                }>
                    <div className="card-body">
                        <h5>{name}</h5>
                        <p>{id}</p>
                    </div>
                </div>
            );
        })}
        </div>
    );
}

Navbar.propTypes = {
    users: PropTypes.array,
    selectUser: PropTypes.func
}

export default Navbar;