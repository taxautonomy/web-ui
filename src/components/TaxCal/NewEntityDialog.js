import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

export default function NewEntityDialog(props) {
  const [newEntity, setNewEntity] = useState({
    date: new Date().toISOString().slice(0, 10),
    desc: '',
    amt: 0
  });

  const handleSubmit = () => {
    var entity = {
      date: new Date(newEntity.date),
      desc: newEntity.desc,
      amt: parseInt(newEntity.amt)
    };

    props.onSubmit(entity);

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
    return (
        <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New {props.entityName}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <div className="modalInputRow">
            <TextField
              id="date"
              label="Date"
              type="date"
              name="date"
              value={newEntity.date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

          </div>
          <div className="modalInputRow">
            <TextField
              id="desc"
              label="Description"
              type="text"
              name="desc"
              value={newEntity.desc}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="modalInputRow">
            <TextField
              id="amt"
              label="Amount"
              type="text"
              name="amt"
              value={newEntity.amt}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={() => props.onCancel()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
}
