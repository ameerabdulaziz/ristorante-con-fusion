import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

const RenderDish = (props) => {
    const {dish} = props;
    return(
        <div className="col-12 col-md-5">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
};

const RenderComments = (props) => {
    const {comments} = props;
    const dishComments = comments.map((comment) => {
        return (
            <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short', day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}</p>
            </div>
        );
    });
    return (
        <div className="col-12 col-md-5">
            <h4>Comments</h4>
            {dishComments}
        </div>
    );
};

export const DishDetail = (props) => {
    const {dish} = props;
    return(
        <div className="container">
            <div className="row">
                <RenderDish dish={dish} />
                <RenderComments comments={dish.comments} />
            </div>
        </div>
    )
};