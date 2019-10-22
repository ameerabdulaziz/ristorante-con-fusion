import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap";

export const MenuItem = (props) => {
    const {dish, onClick} = props;
    return(
        <Card onClick={() => onClick(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    )
};