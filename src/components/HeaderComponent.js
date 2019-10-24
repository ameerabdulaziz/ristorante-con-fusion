import React, { Component } from 'react';
import {Collapse, Jumbotron, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        }
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    };

    render() {
        return (
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={() => this.toggleNav()} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" alt="Ristorante Con Fusion" height="30" width="41" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg" /> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/about-us">
                                        <span className="fa fa-info fa-lg" /> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg" /> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contact-us">
                                        <span className="fa fa-address-card fa-lg" /> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-8">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion
                                    experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default HeaderComponent;