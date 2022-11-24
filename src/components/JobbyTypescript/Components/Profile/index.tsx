import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";
import ApiStatusConstant from "../../Constants/ApiStatusConstant";
import { inject, observer } from "mobx-react";


@inject("profileStore")
@observer
class Profile extends Component<any> {
  profileStore = this.props.profileStore;
  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    this.profileStore.fetchProfileData();
  };

  renderProfile = () => {
    const { profileData } = this.profileStore;
    return (
      <div className="jobby-profile">
        <img src={profileData.profileImageUrl} />
        <h3 className="jobby-profile-name">{profileData.name}</h3>
        <p className="jobby-profile-bio">{profileData.shortBio}</p>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="jobby-profile-detail-failure">
      <button className="profile-retry-btn" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  );

  renderLoadingView = () => (
    <div className="jobby-profile-loader-container">
      <ThreeDots color="white" height={50} width={50} />
    </div>
  );

  render() {
    const { apiStatus } = this.profileStore;
    switch (apiStatus) {
      case ApiStatusConstant.loading:
        return this.renderLoadingView();
      case ApiStatusConstant.failed:
        return this.renderFailureView();
      case ApiStatusConstant.success:
        apiStatus;
        return this.renderProfile();
      default:
        return null;
    }
  }
}

export default Profile;