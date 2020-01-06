import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";

class ContactComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            agree: false,
            contentType: 'Tel.',
            message: '',
            touched: {
                firstName: false,
                lastName: false,
                phone: false,
                email: false
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    validate(firstName, lastName, phone, email) {

        const errors = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        };

        if (this.state.touched.firstName && firstName.length < 3)
            errors.firstName = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstName && firstName.length > 10)
            errors.firstName = 'First Name should be <= 10 characters';

        if (this.state.touched.lastName && lastName.length < 3)
            errors.lastName = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastName && lastName.length > 10)
            errors.lastName = 'Last Name should be <= 10 characters';

        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone))
            errors.phone = 'Phone number should contain only numbers';

        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';
        return errors;
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
        console.log(this.state)
    };

    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(this.state))
    }

    render() {
        const {firstName, lastName, phone, email, agree, contactType, message} = this.state;
        const errors = this.validate(firstName, lastName, phone, email);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send Us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="first-name" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="first-name" name="firstName" placeholder="First Name"
                                           value={firstName}
                                           valid={errors.firstName === ''}
                                           invalid={errors.firstName !== ''}
                                           onBlur={this.handleBlur('firstName')}
                                           onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="last-name" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="last-name" name="lastName" placeholder="Last Name"
                                           value={lastName}
                                           valid={errors.lastName === ''}
                                           invalid={errors.lastName !== ''}
                                           onBlur={this.handleBlur('lastName')}
                                           onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phone" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phone" name="phone" placeholder="Phone"
                                           value={phone}
                                           valid={errors.phone === ''}
                                           invalid={errors.phone !== ''}
                                           onBlur={this.handleBlur('phone')}
                                           onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phone}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="Email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email"
                                           value={email}
                                           valid={errors.email === ''}
                                           invalid={errors.email !== ''}
                                           onBlur={this.handleBlur('email')}
                                           onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree"
                                                   checked={agree}
                                                   onChange={this.handleInputChange} />
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                           value={contactType}
                                           onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                           rows="12"
                                           value={message}
                                           onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactComponent;