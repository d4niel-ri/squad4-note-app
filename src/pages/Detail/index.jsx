/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';

import DeleteDialog from '@components/DeleteDialog';
import { selectLoading, selectNote } from '@pages/Detail/selectors';
import { selectUser } from '@containers/Client/selectors';
import { getNoteByID, updateNote } from './actions';

import 'react-quill/dist/quill.snow.css';
import classes from './style.module.scss';

const Detail = ({ note, loading, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ID_note } = useParams();
  const [ inputs, setInputs ] = useState({title: "", description: ""});
  const [ errors, setErrors ] = useState({title: "", description: ""});
  const [ isEdit, setIsEdit ] = useState(false);
  const [ openDialog, setOpenDialog ] = useState(false);

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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleClickSave = () => {
    setErrors({title: "", description: ""});
    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;
    
    dispatch(updateNote({...note, title: inputs.title, description: inputs.description}));
    setIsEdit(false);
  }

  const handleClickCancel = () => {
    setInputs({title: note.title, description: note.description});
    setErrors({title: "", description: ""});
    setIsEdit(false);
  }

  useEffect(() => {
    dispatch(getNoteByID(ID_note));
  }, [ID_note]);

  useEffect(() => {
    if (note) {
      if (user.id !== parseInt(note.author_id, 10)) {
        navigate('/');
        return;
      }

      console.log(note, "<< NOTE");
      setInputs({title: note.title, description: note.description});
    }
  }, [note])

  return (
    <main>
      <div className={classes.container}>
        {loading ? (<h1>Loading...</h1>) : (
          <>
            <header>
              <Button variant="contained" className={`${classes.edit} ${isEdit ? classes.disappear : ''}`} 
                onClick={() => setIsEdit(true)}
              >
                Edit
              </Button>
              <Button variant="contained" className={`${classes.delete} ${isEdit ? classes.disappear : ''}`} 
                onClick={() => setOpenDialog(true)}
              >
                Delete
              </Button>
              <Button variant="contained" className={`${classes.save} ${!isEdit ? classes.disappear : ''}`} 
                onClick={handleClickSave}
              >
                Save
              </Button>
              <Button variant="contained" className={`${classes.cancel} ${!isEdit ? classes.disappear : ''}`} 
                onClick={handleClickCancel}
              >
                Cancel
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
                  type="text" name="title" id="name" value={inputs.title} disabled={!isEdit}
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
                {isEdit ? (
                  <ReactQuill 
                    theme="snow" value={inputs.description} onChange={(input) => setInputs((prev) => ({ ...prev, description: input }))} 
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: note?.description }} />
                )
                }
              </div>
            </form>
          </>
        )}
      </div>

      {openDialog && (<DeleteDialog open={openDialog} handleClose={handleCloseDialog} id={note.id} />)}
    </main>
  )
};

Detail.propTypes = {
  note: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = createStructuredSelector({
  note: selectNote,
  loading: selectLoading,
  user: selectUser,
})

export default connect(mapStateToProps)(Detail);
