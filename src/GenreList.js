
import React from 'react';
import { List, SimpleList  } from 'react-admin';


export const GenreList = (props) => (
    <List perPage={20} {...props} >
        <SimpleList
            button={false}
            primaryText={ record => record.name }
        />
    </List>
);

