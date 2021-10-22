// https://github.com/xvicmanx/react-crud-table#examples
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import { useDispatch, useSelector } from 'react-redux';
import { viewCustomers, updateCustomer, deleteCustomer, addCustomer} from '../actions/customerActions';
import { setLoading } from '../actions/userActions';
import logo from '../images/Union.svg'

// Component's Base CSS
import '../css/table.css';

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Customers = () => {
  const dispatch = useDispatch();
  const customerReducer = useSelector(state => state.customerReducer)
  let tasks = [];
  useEffect(() => {
    tasks = customerReducer.customerList;
  });

  const FetchItems = async (payload) => {
    await dispatch(viewCustomers());
    tasks =  [...customerReducer.customerList];
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  };

  const update = async (data) => {
    const task = tasks.find(t => t._id === data._id);
    task.name = data.name;
    task.company = data.company;
    task.email = data.email;
    task.phone = data.phone;
    await dispatch(updateCustomer(data));
    return Promise.resolve(task);
  };

  const create = async (task) => {
    await dispatch(addCustomer(task))
    tasks.push(task);
    return Promise.resolve(tasks);
  };

  const  Delete =  async (data) => {
    dispatch(deleteCustomer(data._id));
    const task = tasks.find(t => t._id === data._id);
    tasks = tasks.filter(t => t._id !== task._id);
    return Promise.resolve(tasks);
  };


  return (
    <div className="" style={styles.container}>
      <figure className="mb-2">
          <img className="dashboard-logo-cust" src={logo} alt="" srcset="" />
      </figure>
      <CRUDTable
        caption="Customers"
        fetchItems={payload => FetchItems(payload)}
      >
        <Fields>
          <Field
            name="name"
            label="Name"
            placeholder="name"
          />
          <Field
            name="company"
            label="Company"
            placeholder="company"
          />
          <Field
            name="email"
            label="Email"
            placeholder="email"
          />
          <Field
            name="phone"
            label="Phone"
            placeholder="phone"
          />
        </Fields>

        <CreateForm
          title="Customer Creation"
          message="Add a new customer!"
          trigger="Create"
          onSubmit={(task) => create(task)}
          submitText="Create"
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = 'Please, provide customer\'s name';
            }

            if (!values.company) {
              errors.company = 'Please, provide customer\'s first company';
            }

            if (!values.email) {
              errors.email = 'Please, provide customer\'s email';
            }

            if (!values.phone) {
              errors.phone = 'Please, provide customer\'s phone';
            }

            return errors;
          }}
        />

        <UpdateForm
          title="Customer Update Process"
          message="Update Customer"
          trigger="Update"
          onSubmit={task => update(task)}
          submitText="Update"
          validate={(values) => {
            const errors = {};

            if (!values._id) {
              errors._id = 'Please, provide id';
            }

            if (!values.name) {
              errors.name = 'Please, provide customer\'s name';
            }

            if (!values.company) {
              errors.company = 'Please, provide customer\'s first company';
            }

            if (!values.email) {
              errors.email = 'Please, provide customer\'s email';
            }

            if (!values.phone) {
              errors.phone = 'Please, provide customer\'s phone';
            }
            return errors;
          }}
        />

        <DeleteForm
          title="User Delete Process"
          message="Are you sure you want to delete the User?"
          trigger="Delete"
          onSubmit={task => Delete(task)}
          submitText="Delete"
          validate={(values) => {
            const errors = {};
            if (!values._id) {
              errors._id = 'Please, provide id';
            }
            return errors;
          }}
        />
      </CRUDTable>
    </div>
  );
}

export default Customers;
