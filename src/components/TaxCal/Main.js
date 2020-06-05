import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EntityList from './EntityList';

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
        <Box p={3}>
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
    backgroundColor: theme.palette.background.paper,
  },
}));

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

export default function Calculations() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [qualifyingPaymentList, setQualifyingPaymentList] = useState([]);
  const [taxPaymentList, setTaxPaymentList] = useState([]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const incomeAdded = income => {
    income.id = guid();
    console.log("new income:", income)
    const newList = incomeList.concat(income);

    setIncomeList(newList);
}

const qualifyingPaymentAdded = payment => {
  payment.id = guid();
  console.log("new qualifying payment:", payment)
  const newList = qualifyingPaymentList.concat(payment);

  setQualifyingPaymentList(newList);
}

const taxPaymentAdded = payment => {
  payment.id = guid();
  console.log("new tax payment:", payment)
  const newList = taxPaymentList.concat(payment);

  setTaxPaymentList(newList);
}
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Income" {...a11yProps(0)} />
          <Tab label="Qualifying Payments" {...a11yProps(1)} />
          <Tab label="Advance Tax Payments" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EntityList entityName="Income" onAdd={incomeAdded} list={incomeList}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <EntityList entityName="Qualifying Payment" onAdd={qualifyingPaymentAdded} list={qualifyingPaymentList}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <EntityList entityName="Tax Payment" onAdd={taxPaymentAdded} list={taxPaymentList}/>
      </TabPanel>
    </div>
  );
}
