import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
// import StarIcon from "@material-ui/icons/Star";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { connect } from "react-redux";
import refreshMoviesAction from "./refreshMoviesAction";
import PropTypes from 'prop-types';


class VerticalTimelineDisplay extends Component {
  state = { release_date_after: "2000-01-01" };

  componentDidMount() {
    this.updateMovies();
  }

  updateMovies() {
    const { release_date_after } = this.state;
    const { refreshMovies } = this.props;
    refreshMovies({...release_date_after, ...refreshMovies});
  }

  render() {
    return <VerticalTimelineComponent {...this.props} {...this.state} />;
  }
}
    //<VerticalTimelineElement
      //iconStyle={{ background: "linear-gradient(blue, pink)", color: "#fff" }}
      //icon={<StarIcon />}
    ///>

const VerticalTimelineComponent = ({ movies, ...props }) => (
  <VerticalTimeline>
    {movies.map(movie => (
      <VerticalTimelineElement
        key={movie.title}
        className="vertical-timeline-element--work"
        date={movie.year}
        iconStyle={{}}
        icon={
          <Avatar
            alt={movie.title}
            src={movie.avatar_path}
            style={{ width: "60px", height: "60px" }}
          />
        }
      >
        <h3 className="vertical-timeline-element-title">{movie.title}</h3>
        <h4 className="vertical-timeline-element-subtitle">
          {movie.release_date}
        </h4>
        <p>{movie.overview} </p>
      </VerticalTimelineElement>
    ))}

  </VerticalTimeline>
);


VerticalTimelineDisplay.propTypes = {
    refreshMovies: PropTypes.func
};

const moviesDataMapper = movie => ({
  title: movie.title,
  release_date: movie.release_date,
  overview: movie.overview,
  short_overview: movie.short_overview,
  avatar_path: movie.avatar_path,
  year: new Date(movie.release_date).getFullYear().toString()
});

const mapActionsToProps = { refreshMovies: refreshMoviesAction };

const mapStateToProps = state => ({
  movies: !state.refreshedMoviesReducer.data
    ? []
    : state.refreshedMoviesReducer.data
        .slice(0, 20)
        .map(moviesDataMapper)
        .sort(
          (m1, m2) => new Date(m1.release_date) - new Date(m2.release_date)
        )
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VerticalTimelineDisplay);
