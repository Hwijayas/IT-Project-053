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
import { viewUsers, deleteUser, updateUser} from '../actions/adminActions';
import { setLoading } from '../actions/userActions';

// Component's Base CSS
import '../css/table.css';

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

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Users = () => {
  const dispatch = useDispatch();
  const adminReducer = useSelector(state => state.adminReducer)
  const FetchItems = async (payload) => {
    tasks =  [...adminReducer.userList];
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  };

  const update = async (data) => {
    const task = tasks.find(t => t._id === data._id);
    task.userEmail = data.userEmail;
    task.userFirstName = data.userFirstName;
    task.userLastName = data.userLastName;
    await dispatch(updateUser(data))
    return Promise.resolve(task);
  };

  const  Delete =  async (data) => {
    dispatch(deleteUser(data._id));
    const task = tasks.find(t => t._id === data._id);
    tasks = tasks.filter(t => t._id !== task._id);
    return Promise.resolve(tasks);
  };


  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Users"
        fetchItems={payload => FetchItems(payload)}
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
            label="Email"
            placeholder="User"
          />
          <Field
            name="userFirstName"
            label="First Name"
            placeholder="userFirstName"
          />
          <Field
            name="userLastName"
            label="Last Name"
            placeholder="userFirstName"
          />
          <Field
            name="isAdmin"
            label="Admin"
            placeholder="isAdmin"
            hideInUpdateForm
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
          onSubmit={task => update(task)}
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

export default Users;
