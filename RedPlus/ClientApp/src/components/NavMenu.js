import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">RedPlus</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Entries">Entries</NavLink>
                                </NavItem>
                                <li className="text-dark dropdown">
                                    <NavLink tag={Link} className="text-dark nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Examples
                                    </NavLink>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <NavLink tag={Link} className="nav-link text-dark dropdown-item" to="/Articles/ReactRoadMap">ReactRoadMap</NavLink>
                                        <NavLink tag={Link} className="nav-link text-dark dropdown-item" to="/Articles/MapAndKey">MapAndKey</NavLink>
                                        <NavLink tag={Link} className="nav-link text-dark dropdown-item" to="/Articles/CheckBoxWithUseState">CheckBoxWithUseState</NavLink>
                                        <NavLink tag={Link} className="nav-link text-dark dropdown-item" to="/Pager">Pager Component</NavLink>
                                        <NavLink tag={Link} className="nav-link text-dark dropdown-item" to="/Articles/SearchBoxTest">SearchBox Component</NavLink>
                                    </div>
                                </li>
                                <LoginMenu>
                                </LoginMenu>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
