import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EntityList from './EntityList';
import { Card, Grid, CardContent, CardActions, Button } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
  },
  cards: {
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }
}));

export default function Calculations() {
  const classes = useStyles();
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8} sm={4}>
          <Card className={classes.cards.root} >
            <CardContent>
              <Typography className={classes.cards.title} color="textSecondary" gutterBottom>
                Income
        </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">more info</Button>
              {/* <IconButton size="small"><AddIcon/></IconButton> */}
              <Button size="small">add income</Button>

            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Card className={classes.cards.root}>
            <CardContent>
              <Typography className={classes.cards.title} color="textSecondary" gutterBottom>
                Word of the Day
        </Typography>

              <Typography className={classes.cards.pos} color="textSecondary">
                adjective
        </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
          <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Income" {...a11yProps(0)} />
          <Tab label="Qualifying Payments" {...a11yProps(1)} />
          <Tab label="Advance Tax Payments" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EntityList entityName="Income" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EntityList entityName="Qualifying Payment" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EntityList entityName="Tax Payment" />
      </TabPanel>
    </div>
  );
}
