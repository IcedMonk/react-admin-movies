
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';


const Menu = ({ resources, onMenuClick, logout }) => (

    <div>
        <MenuItemLink
            to="/dashboard"
            primaryText="Movie Dashboard"
            onClick={onMenuClick}
        />
        <MenuItemLink
            to="/greatest-by-vote-average"
            primaryText="Greatest by Votes"
            onClick={onMenuClick}
        />
        <MenuItemLink
            to="/pie-chart"
            primaryText="Pie Chart"
            onClick={onMenuClick}
        />
        {
            resources.map( (resource, i) => (
                <MenuItemLink
                    key={i}
                    to={`/${resource.name}`}
                    primaryText={ resource.name.charAt(0).toUpperCase()
                        + resource.name.substr(1)}
                    onClick={onMenuClick}
                />
            ))
        }
    </div>

);


Menu.propTypes = {
    resources: PropTypes.array,
    onMenuClick: PropTypes.func,
    logout: PropTypes.object ,
};


const mapStateToProps = state => ({
    resources: getResources(state),
});


export default withRouter(connect(mapStateToProps)(Menu));
