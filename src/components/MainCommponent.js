import React, { Component } from 'react';
import Header from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import ContactComponent from "./ContactComponent";
import MenuComponent from "./MenuCommponent";
import DishDetailComponent from "./DishDetailComponent";
import AboutComponent from "./AboutComponent";
import { connect } from 'react-redux';
import { addComment, fetchDishes } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())}
});



class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        const {dishes, comments, leaders, promotions, addComment} = this.props;

        const HomePage = () => {
            return(
                <HomeComponent
                    featuredDish={dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess}
                    featuredPromotion={promotions.filter((promo) => promo.featured)[0]}
                    featuredLeader={leaders.filter((leader) => leader.featured)[0]}
                />
            );
        };

        const DishWithId = ({match}) => {
            return(
                <DishDetailComponent dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                                     isLoading={dishes.isLoading}
                                     errMess={dishes.errMess}
                                     comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                                     addComment={addComment}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/about-us" component={() => <AboutComponent leaders={leaders}/>} />
                    <Route exact path="/menu" component={() => <MenuComponent dishes={dishes}/>} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contact-us" component={ContactComponent} />
                    <Redirect to="/home" />
                </Switch>
                <FooterComponent />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));