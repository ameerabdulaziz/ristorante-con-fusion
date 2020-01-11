import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from 'react-redux-form';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState( state => ({
            isModalOpen: !state.isModalOpen,
        }))
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return(
            <div className="col-12 col-md-5">
                <div className="row">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-edit fa-lg" /> Submit Comment
                    </Button>

                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select type="number" className="form-control" id="rating"
                                                    name="rating"
                                                    model=".rating"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text className="form-control" id="name"
                                                  name="name"
                                                  model=".name"
                                                  validators={{
                                                      minLength: minLength(3),
                                                      maxLength: maxLength(15),
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea className="form-control" rows={6} id="comment"
                                                      name="comment"
                                                      model=".comment"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

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
    const { comments, addComment, dishId } = props;
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
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
};

const DishDetailComponent = (props) => {
    const {dish, comments, addComment} = props;
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
                <RenderComments comments={comments} addComment={addComment} dishId={dish.id} />
            </div>
        </div>
    )
};

export default DishDetailComponent;