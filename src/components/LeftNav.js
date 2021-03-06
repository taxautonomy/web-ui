import React, { useContext } from 'react'
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Config from '../Config';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import { AppContext } from '../ContextHelper'
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
  const { activeWorkspace, setActiveWorkspace, workspaces } = useContext(AppContext);
  const setActiveWorkspaceById = schemeId => setActiveWorkspace(workspaces.find(scheme => scheme.id === schemeId))
  const handleCurrentSchemeChange = schemeId => { setActiveWorkspaceById(schemeId); props.onClickHide(); }
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
        {workspaces.map((scheme) => (
          <ListItem button
            selected={activeWorkspace && scheme.id === activeWorkspace.id}
            key={scheme.id} onClick={() => { handleCurrentSchemeChange(scheme.id) }}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={scheme.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}
