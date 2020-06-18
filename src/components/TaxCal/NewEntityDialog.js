import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { useMediaQuery, AppBar, Typography, Toolbar } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  entityListDialogPaper: {
    minHeight: '90vh',
    maxHeight: '90vh',
  }
}));

export default function NewEntityDialog(props) {

  const [newEntity, setNewEntity] = useState(props.entity);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleSubmit = (keepOpen) => {

    var entity = {
      date: new Date(newEntity.date),
      desc: newEntity.desc,
      amt: parseInt(newEntity.amt)
    };

    if (newEntity.id){
      entity.id = newEntity.id;
    }

    props.onSubmit(props.entityType.key, entity, keepOpen);
    setNewEntity(props.entity);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = name === 'schedule' ? !target.checked : target.value;

    console.log(`handling the onChange event of ${name} changing to ${value}`);
    setNewEntity({
      ...newEntity,
      [name]: value
    });

  }

  useEffect(() => {
    setNewEntity(props.entity);
  }, [props.open])
  
  const DialogTitleBar = () => {

    const titleText = (newEntity.id?'Edit ':'New ') + props.entityType.name;

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

  return (
    <Dialog open={props.open} fullScreen={fullScreen} aria-labelledby="form-dialog-title">
      <DialogTitleBar />
      <DialogContent>
        <div className="modalInputRow">
          <TextField
            id="date"
            label="Date"
            type="date"
            name="date"
            value={newEntity.date}
            onChange={handleInputChange}
          />

        </div>
        <div className="modalInputRow">
          <TextField
            id="desc"
            fullWidth={true}
            label="Description"
            type="text"
            name="desc"
            value={newEntity.desc}
            onChange={handleInputChange}

          />
        </div>
        <div className="modalInputRow">
          <TextField
            id="amt"
            label="Amount"
            type="text"
            name="amt"
            value={newEntity.amt > 0 ? newEntity.amt : ''}
            onChange={handleInputChange}
          />          </div>
      </DialogContent>
      <DialogActions>
        <Button id="save" onClick={() => handleSubmit(false)} variant="outlined" color="primary">Save</Button>
        {newEntity.id?'':<Button onClick={() => handleSubmit(true)} variant="outlined" color="primary">Save & Add New</Button>}
        <Button onClick={() => props.onCancel()} variant="outlined" color="primary">Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
