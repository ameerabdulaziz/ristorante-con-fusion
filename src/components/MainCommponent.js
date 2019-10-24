import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Header from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import {Route, Redirect, Switch} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import ContactComponent from "./ContactComponent";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import MenuComponent from "./MenuCommponent";
import DishDetailComponent from "./DishDetailComponent";
import AboutComponent from "./AboutComponent";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS,
        };
    }

    render() {
        const {dishes, comments, leaders, promotions} = this.state;
        const DishDetail = ({match}) => {
            const dishId = parseInt(match.params.dishId, 10);
            const dish = dishes.filter(dish => dish.id === dishId)[0];
            const dishComments = comments.filter(comment => comment.dishId === dishId);
            return(
                <DishDetailComponent dish={dish} comments={dishComments}/>
            )
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={() => <HomeComponent
                        featuredDish={dishes.filter(dish => dish.featured === true)[0]}
                        featuredLeader={leaders.filter(leader => leader.featured === true)[0]}
                        featuredPromotion={promotions.filter(promotion => promotion.featured === true)[0]}
                    />} />
                    <Route exact path="/about-us" component={() => <AboutComponent leaders={leaders}/>} />
                    <Route exact path="/menu" component={() => <MenuComponent dishes={this.state.dishes}/>} />
                    <Route path="/menu/:dishId" component={DishDetail} />
                    <Route exact path="/contact-us" component={ContactComponent} />
                    <Redirect to="/home" />
                </Switch>
                <FooterComponent />
            </div>
        );
    }
}

export default Main;