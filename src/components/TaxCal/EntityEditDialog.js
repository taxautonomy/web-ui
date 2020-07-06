import React, { useState, useEffect, useContext } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { useMediaQuery, AppBar, Typography, Toolbar } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';
import { TaxCalculationContext } from '../../AppContext';

export default function EntityEditDialog(props) {

  const [newEntity, setNewEntity] = useState(props.entity);
  const { entityCollection, currentScheme } = useContext(TaxCalculationContext);
  const { name } = entityCollection[props.entityType];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [dateHelperText, setDateHelperText] = useState('')
  const handleSubmit = (keepOpen) => {

    const { start_date, end_date } = currentScheme;

    var entity = {
      date: new Date(newEntity.date),
      desc: newEntity.desc,
      amt: parseFloat(newEntity.amt, 10),
      type: props.entityType
    };

    let isValidDate = (entity.date > start_date && entity.date < end_date);
    setDateHelperText(isValidDate ? '' : 'Date should be within the scheme start date and end date');

    if (newEntity.id)
      entity.id = newEntity.id;

    if (isValidDate) {
      props.onSubmit(entity, keepOpen);
      setNewEntity(props.entity);
    }
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = name === 'schedule' ? !target.checked : target.value;

    setNewEntity({
      ...newEntity,
      [name]: value
    });

  }

  useEffect(() => {
    setNewEntity(props.entity);
  }, [props.open])

  const DialogTitleBar = () => {

    const titleText = (newEntity.id ? 'Edit ' : 'New ') + name;

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
            error={!(dateHelperText === '')}
            helperText={dateHelperText}
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
        {newEntity.id ? '' : <Button onClick={() => handleSubmit(true)} variant="outlined" color="primary">Save & Add New</Button>}
        <Button onClick={() => props.onCancel()} variant="outlined" color="primary">Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
