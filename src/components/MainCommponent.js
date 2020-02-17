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
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos, postComment, postFeedback } from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) =>
        dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    fetchDishes: () => { dispatch(fetchDishes())},
    fetchLeaders: () => { dispatch(fetchLeaders())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
});



class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const {dishes, comments, leaders, promotions, postComment, resetFeedbackForm, postFeedback} = this.props;

        const HomePage = () => {
            return(
                <HomeComponent
                    featuredDish={dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess}
                    featuredPromotion={promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={promotions.isLoading}
                    promoErrMess={promotions.errMess}
                    featuredLeader={leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={leaders.isLoading}
                    leadersErrMess={leaders.errMess}
                />
            );
        };

        const DishWithId = ({match}) => {
            return(
                <DishDetailComponent dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                                     isLoading={dishes.isLoading}
                                     errMess={dishes.errMess}
                                     comments={comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                                     postComment={postComment}
                                     commentsErrMess={comments.errMess}
                />
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch location={this.props.location}>
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/about-us" component={() => <AboutComponent leaders={leaders}/>} />
                            <Route exact path="/menu" component={() => <MenuComponent dishes={dishes}/>} />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contact-us" component={() => <ContactComponent
                                resetFeedbackForm={resetFeedbackForm} postFeedback={postFeedback} />} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <FooterComponent />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));