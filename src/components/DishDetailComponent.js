import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const RenderDish = ({dish}) => {
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

const DishDetailComponent = (props) => {
    const {dish, comments} = props;
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <RenderDish dish={dish} />
                <RenderComments comments={comments}/>
            </div>
        </div>
    )
};

export default DishDetailComponent;