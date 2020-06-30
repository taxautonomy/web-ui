import React, { useContext } from 'react'
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Config from '../Config';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import { TaxCalculationContext } from '../AppContext'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function LeftNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { currentScheme, setCurrentScheme, schemes } = useContext(TaxCalculationContext);
  const setCurrentSchemeById = schemeId => setCurrentScheme(schemes.find(scheme => scheme.id === schemeId))
  const handleCurrentSchemeChange = schemeId => { setCurrentSchemeById(schemeId); props.onClickHide(); }
  return (
    <Drawer variant="persistent" anchor="left" open={props.open} style={{}}>
      <div className={classes.drawerHeader}>
        <CardMembershipIcon />&nbsp;<Typography variant="h5" style={{ flexGrow: 1 }} >{Config.appTitle}</Typography>
        <IconButton onClick={() => props.onClickHide()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <ListItem>
        <ListItemText primary="Tax Scheme:" />
      </ListItem>
      <List>
        {schemes.map((scheme) => (
          <ListItem button
            selected={currentScheme && scheme.id === currentScheme.id}
            key={scheme.id} onClick={() => { handleCurrentSchemeChange(scheme.id) }}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={scheme.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
