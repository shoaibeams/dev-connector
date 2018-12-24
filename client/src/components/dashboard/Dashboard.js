import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfileAction,
  deleteAccountAction
} from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileEdit from "./ProfileEdit";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfileAction();
  }

  onDeleteClick(e) {
    this.props.deleteAccountAction();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashContent;
    if (profile === null || loading) {
      dashContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashContent = (
          <div>
            <p className="lead text-muted">
              {" "}
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>{user.name}!</Link>
            </p>
            <ProfileEdit />

            <div style={{ marginBottom: "60px" }} />
            <button
              className="btn-danger"
              onClick={this.onDeleteClick.bind(this)}
            >
              Delete my account.
            </button>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashContent = (
          <div>
            <p className="lead text-muted"> Welcome {user.name}!</p>
            <p> You haven't setup a profile yet. Let's get started</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create a Profile.
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfileAction: PropTypes.func.isRequired,
  deleteAccountAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { getCurrentProfileAction, deleteAccountAction }
)(Dashboard);
