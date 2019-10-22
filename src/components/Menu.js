import React from 'react';
import {MenuItem} from "./MenuItem";

export const Menu = (props) => {
    const {dishes, onClick} = props;
    const menu = dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <MenuItem dish={dish} onClick={onClick} />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    )
};