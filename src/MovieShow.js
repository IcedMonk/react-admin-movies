
import React from 'react';
import {
    Show,
    DateField,
    NumberField,
    RichTextField,
    TextField,
    ImageField,
    Loading,
    TabbedShowLayout,
    Tab,
} from 'react-admin';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import themoviedbDataProvider from './themoviedbDataProvider';
import compose from 'recompose/compose';


const withCastData = MovieShow => (

    class extends React.Component {

        state = { isLoading: true, cast: [] };

        componentDidMount() {

            const { match } = this.props;
            const dataProvider = themoviedbDataProvider;
            dataProvider('GET_LIST', 'casts', { movie_id: match.params.id })
                .then(result => result.data)
                .then(cast => {
                    this.setState({cast: cast, isLoading: false});
                });
        }

        render() {
            return (
                <MovieShow {...this.props} {...this.state} />
            );
        }
    }
);


const styles = {
  //override the style of Tab by using style={styles.tab} in <Tab ...>
  tab: {
      padding: '2em 1em 1em 2em'
  },
  //overriding image style of the ImageField by passing prop classes={classes} in <ImageField ...>
  image: {
    margin: '0.5rem',
    width: '300px',
    maxHeight: '30rem',
    maxWidth: '30%',
  },
};


const MovieTitle = ({ record }) => (
    <span>{record ? `${record.title}` : ''}</span>
);

MovieTitle.propTypes = {
    record: PropTypes.object,
};


const MovieShow = ({classes, isLoading, cast, ...restProps}) => {

    return isLoading ? <Loading /> : (
        <Show title={<MovieTitle />} {...restProps}>
            <TabbedShowLayout classes={{tab: classes.tab}} >
                <Tab label="Summary" >
                    <ImageField source="image_path" classes={{ image: classes.image }} />
                    <TextField source="tagline" addLabel={false}
                        style={{color: 'purple', fontSize: '1.5rem'}} />
                    <DateField label="Release Date" source="release_date"
                        options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  />
                    <Divider />
                    { cast.slice(0, 10).map( celeb => (
                        <div style={{display: 'inline-block', float: 'left', padding: '1em'}}
                            key={"Celeb-Avatar-" + celeb.id} >
                            <Avatar
                                alt={celeb.character}
                                src={celeb.profile_path}
                                style={{width: '70px', height: '70px' }}
                            />
                            <Typography variant="title" color="primary">{celeb.name}</Typography>
                            <Typography variant="subheading" color="textSecondary">
                                {celeb.character ? `as ${celeb.character}` : `No character info`}
                            </Typography>
                        </div>
                    )) }
                </Tab>
                <Tab label="Overview">
                    <RichTextField source="overview" addLabel={false} />
                </Tab>
                <Tab label="Stats">
                    <NumberField source="budget" options={{ style: 'currency', currency: 'USD' }} />
                    <NumberField source="revenue" options={{ style: 'currency', currency: 'USD' }} />
                    <NumberField source="popularity" options={{ maximumFractionDigits: 2 }} />
                    <TextField label="Language" source="spoken_languages[0].name" />
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};



MovieShow.propTypes = {
    classes: PropTypes.object,
    isLoading: PropTypes.bool,
    cast: PropTypes.array,
};

const enhance = compose(
    withStyles(styles),
);

export default withCastData(enhance(MovieShow));
