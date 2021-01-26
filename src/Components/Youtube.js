import React, { useState } from 'react';
import { Formik, Form, Field, FastField, ErrorMessage, FieldArray } from 'formik';
import * as Yup from "yup";
import TextError from './TextError';
function Youtube() {
    const [formValues, setFormValues] = useState(null);
    const initialValues = {
        name: 'Vishwas',
        email: '',
        channel: '',
        comments: '',
        address: '',
        social: {
            facebook: '',
            twitter: '',
        },
        phoneNumbers: ['', ''],
        phNumbers: ['']
    }
    const savedValues = {
        name: 'Hridoy',
        email: 'H@gmail.com',
        channel: 'dibana',
        comments: 'hillo',
        address: 'hoito',
        social: {
            facebook: 'v2',
            twitter: 'd',
        },
        phoneNumbers: ['', ''],
        phNumbers: ['']
    }
    const onSubmit = (values, onSubmitProps) => {
        console.log("form data", values)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm();
    }
    const validate = (values) => {
        let errors = {}
      
        if(!values.name) {
            errors.name = "Required"
        }

      if(!values.email) {
          errors.email = "Required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email format'
      }
      if(!values.channel) {
          errors.channel = "Required"
      }
        return errors ;
      }
    const validationSchema = Yup.object({
        name: Yup.string('this').required('Required'),
        email: Yup.string().email('Invalid format').required("Required"),
        channel: Yup.string().required('Required'),
    })
    const validateComments = (value) => {
        let error;
        if(!value) {
            error = 'Required';
        }
        return error;

    }
    return (
        <Formik initialValues={formValues || initialValues} validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
        // validateOnMount
        >
            {
                (formik) => {
                    console.log(formik)
                    return (
                        <Form>
            <div className='form-control'>
                <label htmlFor='name'>Name</label>
                <Field type='text' id='name' name='name'
                />
                <ErrorMessage name='name' component={TextError} />
            </div>
                <div className='form-control'>
                <label htmlFor='email'>E-mail</label>
                <FastField type='text' id='email' name='email' />
                <ErrorMessage name='email'>
                {errorMsg => <div className='error'>{errorMsg}</div>}</ErrorMessage>
                </div>
            <div className='form-control'>
                <label htmlFor='channel'>Channel</label>
                <FastField type='text' id='channel' name='channel' />
                <ErrorMessage name='channel' component={TextError}/>
            </div>
            <div className='form-control'>
                <label htmlFor='comments'>Comments</label>
                <FastField component='textarea' id='comments' name='comments' validate={validateComments} />
                <ErrorMessage name='comments' component={TextError} />
            </div>
            <div className='form-control'>
                <label htmlFor='address'>Address</label>
                <FastField  id='address' name='address'>
                    {
                        (props) => {
                            const { field, form, meta } = props;
                            return (
                            <div>
                                <input type="text" id="address" {...field} />
                                {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                            </div>)
                        }
                    }
                </FastField>
            </div>
            <div className="form-control">
                <label htmlFor="facebook">Facebook profile</label>
                <FastField type="text" id="facebook" name="social.facebook" />
            </div>
            <div className="form-control">
                <label htmlFor="twitter">Twitter profile</label>
                <FastField type="text" id="twitter " name="social.twitter" />
            </div>
            <div className="form-control">
                <label htmlFor="primary-number">Primary number</label>
                <FastField type="text" id="primary-number " name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
                <label htmlFor="secondary-number">Primary number</label>
                <FastField type="text" id="secondary-number " name="phoneNumbers[1]" />
            </div>
            <div className='form-control'>
                <label>list of phone numbers</label>
                <FieldArray name='phNumbers'>
                {
                    (fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const {values} = form;
                        const {phNumbers} = values
                        

                        return <div>
                            {
                                phNumbers.map((phnumber, index) => (
                                    <div key={index}>
                                        <Field name={`phNumbers[${index}]`} />
                                        { index > 0 &&
                                            <button type="button" onClick={() => remove(index)}> - </button>
                                        }
                                        <button type="button" onClick={() => push('')}> + </button>
                                    </div>
                                ))
                            }
                        </div>
                    }
                }
                </FieldArray> 
            </div>
                {/* <button type="button" onClick={() => formik.validateField('comments')}>Validate comments</button>
                <button type="button" onClick={() => formik.validateForm()}>Validate all</button>

                <button type="button" onClick={() => formik.setFieldTouched('comments')}>Visite comments</button>

                <button type="button" onClick={() => formik.setTouched({name: true, email: true, channel: true, comments: true})}>Visite all</button><br />
 */}
                

                {/* <button type="submit" disabled={!(formik.dirty && formik.isValid)}>Submit</button> */}
                <button type="button" onClick={() => setFormValues(savedValues)}>Load saved data</button>
                <button type="reset">Reset</button>
                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
            </Form>
                    )
                }
            }
            
        </Formik>
    )
}

export default Youtube;
