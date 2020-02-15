import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from 'react-animation-components';

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
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
};

const HomeComponent = (props) => {
    const {featuredDish, featuredLeader, featuredPromotion, dishesLoading, dishesErrMess, promoLoading, promoErrMess} = props;
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
                    <RenderCard item={featuredPromotion} isLoading={promoLoading} errMess={promoErrMess} />
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;