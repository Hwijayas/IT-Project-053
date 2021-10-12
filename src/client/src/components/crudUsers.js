// https://github.com/xvicmanx/react-crud-table#examples
import React from 'react';
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
import { viewUsers} from '../actions/adminActions';

// Component's Base CSS
import '../css/table.css';

// Todo: use the thunks to fetch update delete the users; allow access only to admin

let tasks = [];

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


let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count,
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find(t => t._id === data._id);
    task.userEmail = data.userEmail;
    task.userFirstName = data.userFirstName;
    task.userLastName = data.userLastName;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find(t => t._id === data._id);
    tasks = tasks.filter(t => t._id !== task._id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Users = () => {
  const dispatch = useDispatch();
  dispatch(viewUsers());
  const adminReducer = useSelector(state => state.adminReducer)

  tasks =  [...adminReducer.userList];
  console.log(adminReducer.userList)

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Users"
        fetchItems={payload => service.fetchItems(payload)}
      >
        <Fields>
          {/*<Field*/}
          {/*  name="id"*/}
          {/*  label="Id"*/}
          {/*  hideInCreateForm*/}
          {/*  readOnly*/}
          {/*/>*/}
          <Field
            name="userEmail"
            label="userEmail"
            placeholder="User"
          />
          <Field
            name="userFirstName"
            label="userFirstName"
            placeholder="userFirstName"
          />
          <Field
            name="userLastName"
            label="userLastName"
            placeholder="userFirstName"
          />
          {/*<Field*/}
          {/*  name="Email"*/}
          {/*  label="Email"*/}
          {/*  render={DescriptionRenderer}*/}
          {/*/>*/}
        </Fields>
        {/*<CreateForm*/}
        {/*  title="Task Creation"*/}
        {/*  message="Create a new task!"*/}
        {/*  trigger="Create Task"*/}
        {/*  onSubmit={task => service.create(task)}*/}
        {/*  submitText="Create"*/}
        {/*  validate={(values) => {*/}
        {/*    const errors = {};*/}
        {/*    if (!values.title) {*/}
        {/*      errors.title = 'Please, provide task\'s title';*/}
        {/*    }*/}

        {/*    if (!values.description) {*/}
        {/*      errors.description = 'Please, provide task\'s description';*/}
        {/*    }*/}

        {/*    return errors;*/}
        {/*  }}*/}
        {/*/>*/}

        <UpdateForm
          title="User Update Process"
          message="Update User"
          trigger="Update"
          onSubmit={task => service.update(task)}
          submitText="Update"
          validate={(values) => {
            const errors = {};

            if (!values._id) {
              errors._id = 'Please, provide id';
            }

            if (!values.userEmail) {
              errors.title = 'Please, provide user\'s Email';
            }

            if (!values.userFirstName) {
              errors.title = 'Please, provide user\'s first name';
            }

            if (!values.userLastName) {
              errors.title = 'Please, provide user\'s last name';
            }
            return errors;
          }}
        />

        <DeleteForm
          title="User Delete Process"
          message="Are you sure you want to delete the User?"
          trigger="Delete"
          onSubmit={task => service.delete(task)}
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

export default Users;
