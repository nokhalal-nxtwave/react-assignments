import { Component } from "react";
import JobFilter from "../../Components/JobFilter";
import JobList from "../../Components/jobsList";
import NavBar from "../../Components/NavBar";
import Profile from "../../Components/Profile";
import SearchBar from "../../Components/SearchBar";
import "./index.css";

class Jobs extends Component {
  state = { searchValue: "", employmentFilter: [], salary: "" };

  onChangeSearch = (value) => {
    this.setState({ searchValue: value });
  };
  onClearInput=()=>{
    this.setState({ searchValue: '' });
  }
  onChangeEmploymentFilter = (id) => {
    const { employmentFilter } = this.state;
    if (employmentFilter.find((item) => item === id)) {
      this.setState((prevData) => ({
        employmentFilter: prevData.employmentFilter.filter(
          (item) => item !== id
        ),
      }));
    } else {
      this.setState((prevData) => ({
        employmentFilter: [...prevData.employmentFilter, id],
      }));
    }
  };
  onChangeSalaryFilter = (value) => {
    this.setState({ salary: value },console.log(this.state.salary));
  };
  render() {
    const { searchValue, employmentFilter, salary } = this.state;
    return (
      <div className="jobby-jobs-page">
        <NavBar />
        <div className="jobby-jobs-content">
          <div className="jobby-jobs-left-section">
            <SearchBar
              searchValue={searchValue}
              onChangeSearch={this.onChangeSearch}
              clearInput={this.onClearInput}
            />
            <Profile />
            <hr className="jobby-filter-divider" />
            <JobFilter
              onChangeEmploymentFilter={this.onChangeEmploymentFilter}
              onChangeSalaryFilter={this.onChangeSalaryFilter}
            />
          </div>
          <div className="jobby-jobs-right-section">
            <SearchBar
              searchValue={searchValue}
              onChangeSearch={this.onChangeSearch}
              className="jobby-search-fixed"
              clearInput={this.onClearInput}
            />
            <JobList
              searchValue={searchValue}
              employmentFilter={employmentFilter}
              salary={salary}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
