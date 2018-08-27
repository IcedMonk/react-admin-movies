
import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';


const Menu = ({ resources, onMenuClick, logout }) => (
    <div>
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
        <MenuItemLink
            to="/dashboard"
            primaryText="Admin Dashboard"
            onClick={onMenuClick}
        />
        <MenuItemLink
            to="/test-chart"
            primaryText="Test Chart"
            onClick={onMenuClick}
        />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));
