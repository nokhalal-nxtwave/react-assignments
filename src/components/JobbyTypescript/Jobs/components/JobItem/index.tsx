import { Component } from "react";
import "./index.css";
import {AiFillStar} from 'react-icons/ai';
import  {MdLocationPin} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom';

type PropsType = {
  jobData: {
    id: string;
    title: string;
    companyLogoUrl:string;
    rating:number;
    location:string;
    employmentType:string;
    packagePerAnnum:string;
    jobDescription:string;
  };
};

class JobItem extends Component<PropsType> {
  render() {
    const {jobData}=this.props;
    return (
      <Link
        className="jobby-jobItem-link"
        to={`/JobbyTypescript/jobs/${jobData.id}`}
      >
        <div className="jobby-jobItem">
          <div className="jobby-jobItem-top-section">
            <img src={jobData.companyLogoUrl} alt={jobData.title} />
            <div className="jobby-jobItem-top-right-section">
              <h2 className="jobby-jobItem-title">{jobData.title}</h2>
              <div className="jobby-jobItem-rating-container">
                <AiFillStar className="jobby-jobItem-rating-icon" />
                <h2 className="jobby-jobItem-rating">{jobData.rating}</h2>
              </div>
            </div>
          </div>
          <div className="jobby-jobItem-middle-section">
            <div className="jobby-jobItem-middle-left-section">
              <div className="jobby-jobItem-location-container">
                <MdLocationPin className="jobby-jobItem-location-icon" />
                <p className="jobby-jobItem-location-text">{jobData.location}</p>
              </div>
              <div className="jobby-jobItem-employment-container">
                <BsBriefcaseFill className="jobby-jobItem-employment-icon" />
                <p className="jobby-jobItem-employment-text">
                  {jobData.employmentType}
                </p>
              </div>
            </div>
            <h3 className="jobby-jobItem-salary">{jobData.packagePerAnnum}</h3>
          </div>
          <hr className="jobby-item-divider" />
          <h3 className="jobby-jobItem-description-heading">Description</h3>
          <p className="jobby-jobItem-description">{jobData.jobDescription}</p>
        </div>
      </Link>
    );
  }
}

export default JobItem;