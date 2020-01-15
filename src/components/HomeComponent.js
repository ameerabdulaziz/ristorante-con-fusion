import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";

const RenderCard = ({item, isLoading, errMess}) => {
    if (isLoading) {
        return(
            <Loading />
        );
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else {
        return (
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
};

const HomeComponent = (props) => {
    const {featuredDish, featuredLeader, featuredPromotion, dishesLoading, dishesErrMess} = props;
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={featuredDish} isLoading={dishesLoading} errMess={dishesErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={featuredLeader} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={featuredPromotion} />
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;