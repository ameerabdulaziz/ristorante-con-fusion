import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";

const RenderCard = ({item}) => {
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
};

const HomeComponent = (props) => {
    const {featuredDish, featuredLeader, featuredPromotion} = props;
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={featuredDish} />
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