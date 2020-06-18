import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import EntityList from './EntityList';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import {
	Typography,
	IconButton,
	Dialog,
	AppBar,
	Toolbar,
	Transition,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
root: {
	flexGrow: 1,
	//backgroundColor: theme.palette.background.paper,
},
entityListDialogAppBar: {
	position: 'relative',
},
entityListDialogTitle: {
	marginLeft: theme.spacing(2),
	flex: 1,
},
entityListDialogPaper: {
	minHeight: '90vh',
	maxHeight: '90vh',
},
}));

export default function EntityDeleteDialog(props) {
	const { entity, entityType } = props;

	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const DialogTitleBar = () => {

		const titleText = `Delete ${props.entityType.name} Confirmation`;

		const titleFullScreen = (
			<AppBar position="static" >
				<Toolbar>
					<Typography variant="h5" style={{ flexGrow: 1 }}>
						{titleText} - TaxAutonomy
		  </Typography>
				</Toolbar>
			</AppBar>
		);

		const titleNormal = (<DialogTitle id="form-dialog-title">{titleText}</DialogTitle>);

		return (fullScreen ? titleFullScreen : titleNormal)
	};

  const handleClickYes = () => {
    console.log("Deleting Entity: ", entity);
    props.onSubmit(entityType.key, entity);
  }

	return (
		<Dialog
			fullScreen={fullScreen}
			open={props.open}>
			<DialogTitleBar />
			<DialogContent>
				<Typography>Are you sure to delete the following {entityType.name} ?</Typography>
				<Typography>Date: {entity.date}</Typography>
				<Typography>Description: {entity.desc}</Typography>
				<Typography>Amount: {entity.amt.toFixed(2)}</Typography>
			</DialogContent>
      <DialogActions>
        <Button onClick={() => handleClickYes()} variant="outlined" color="primary">Yes</Button>
        <Button onClick={() => props.onCancel()} variant="outlined" color="primary">No</Button>
      </DialogActions>
		</Dialog>
	);
}
