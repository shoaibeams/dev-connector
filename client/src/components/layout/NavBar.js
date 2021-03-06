import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUserAction } from "../../actions/authActions";
import { clearCurrentProfileAction } from "../../actions/profileAction";

class NavBar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUserAction();
    this.props.clearCurrentProfileAction();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravatar connected to
                    your email to display an image"
              style={{
                width: "25px",
                marginRight: "5px"
              }}
            />
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">
            Sign Up
          </Link>
        </li>
      </ul>
    );

    return (
      // Navbar
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logoutUserAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { logoutUserAction, clearCurrentProfileAction }
)(NavBar);
