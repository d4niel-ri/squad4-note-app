import { TextField, Button } from '@mui/material';
// import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes } from './selectors';
import { addNotesAction } from './actions';
import classes from './style.module.scss';

const AddNotes = () => {
  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: notes?.title || '',
    description: notes?.description || '',
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-use-before-define
    if (!validateForm()) {
      return;
    }
    dispatch(addNotesAction(formData));
  };
  const validateForm = () => {
    let valid = true;
    const newError = {};

    if (formData.title === '') {
      newError.title = '*Title is Required';
      valid = false;
    }

    if (formData.description === '') {
      newError.description = '*Description is Required';
      valid = false;
    }

    setError(newError);
    return valid;
  };
  return (
    <div className={classes.conAddForm}>
      <div className={classes.contentAddForm}>
        <form className={classes.formAdd} onSubmit={handleSubmit}>
          <div className={classes.titleInput}>
            <TextField
              label="Notes"
              name="title"
              size="small"
              sx={{ mt: 0 }}
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!error.title}
              helperText={error.title}
            />
          </div>
          <div className={classes.descriptionInput}>
            <TextField
              label="Description"
              name="description"
              size="small"
              sx={{ mt: 0 }}
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!error.description}
              helperText={error.description}
            />
          </div>
          <div className={classes.botton}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
