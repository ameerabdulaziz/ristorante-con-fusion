import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import {Menu} from './Menu';
import { DISHES } from '../shared/dishes';
import {DishDetail} from "./DishDetail";

class Main extends Component {

    // This constructor define `selectedDish` state as `null`
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    // This method sets `selectedDish` state as the input `dish`
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }


    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                {this.state.selectedDish?
                    <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                    : null}
            </div>
        );
    }
}

export default Main;