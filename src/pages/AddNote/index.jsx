/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';

import { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { selectLoading, selectNote } from './selectors';

import classes from './style.module.scss';
import { addNote } from './actions';

const AddNote = ({ note, user, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({ title: '', description: '' });

  const validateTitle = () => {
    if (!inputs.title) {
      setErrors((prev) => ({...prev, title: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validateDescription = () => {
    if (!inputs.description) {
      setErrors((prev) => ({...prev, description: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validateInputs = () => {
    const isValidatedTitle = validateTitle();
    const isValidatedDescription = validateDescription();

    if (!isValidatedTitle || !isValidatedDescription) {
      return false;
    }

    return true;
  }

  const navigateToHome = () => navigate("/");

  const handleClickSave = () => {
    setErrors({title: "", description: ""});
    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;
    
    dispatch(addNote({...inputs, author_id: user.author_id}, navigateToHome));
  }

  return (
    <main>
      <div className={classes.container}>
        {loading ? (<h1>Loading...</h1>) : (
          <>
            <header>
              <Button variant="contained" className={classes.save} 
                onClick={handleClickSave}
              >
                Create
              </Button>
            </header>
            <form>
              <div className={classes.input}>
                <div className={classes.label}>
                  <label htmlFor='title'>
                    Title
                  </label>
                  {errors.title && (
                    <p className={classes.error}>
                      <FormattedMessage id={errors.title} />
                    </p>
                  )}
                </div>
                <input 
                  type="text" name="title" id="name" value={inputs.title}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))}  
                />
              </div>
              <div className={classes.input}>
                <div className={classes.label}>
                  <label htmlFor='description'>
                    Note&lsquo;s content
                  </label>
                  {errors.description && (
                    <p className={classes.error}>
                      <FormattedMessage id={errors.description} />
                    </p>
                  )}
                </div>
                  <ReactQuill 
                    theme="snow" value={inputs.description} onChange={(input) => setInputs((prev) => ({ ...prev, description: input }))} 
                  />
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  )
};

AddNote.propTypes = {
  note: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  note: selectNote,
  loading: selectLoading,
  user: selectUser,
});

export default connect(mapStateToProps)(AddNote);
