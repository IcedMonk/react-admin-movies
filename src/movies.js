

import React from 'react';
import { Show, List, DateField, NumberField, RichTextField, TextField, ImageField, TabbedShowLayout, Tab, ReferenceArrayField, SingleFieldList } from 'react-admin';

//import Card from '@material-ui/core/Card';
//import CardMedia from '@material-ui/core/CardMedia';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import CardHeader from '@material-ui/core/CardHeader';


export const MovieShow = (props) => (
    <Show title="Movie Details" {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <ImageField source="image_path" />
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="tagline" />
                <DateField label="Release Date" source="release_date"
                    options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  />
            </Tab>
            <Tab label="body">
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
