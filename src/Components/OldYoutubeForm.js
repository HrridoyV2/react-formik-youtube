import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
function OldYoutubeForm() {
    const initialValues = {
        name: 'Vishwas',
        email: '',
        channel: '',
    }
    const onSubmit = (values) => {
        console.log("form data", values)
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
    const formik = useFormik({
        initialValues,
        onSubmit, 
        // validate 
        validationSchema
    })
    console.log("Form values:", formik.values);
    console.log("Form errors:", formik.touched);
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? <span style={{color: 'red'}}>{formik.errors.name}</span> : null}

                <label htmlFor='email'>E-mail</label>
                <input type='text' id='email' name='email'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <span style={{color: 'red'}}>{formik.errors.email}</span> : null}

                <label htmlFor='chennel'>Channel</label>
                <input type='text' id='chennel' name='channel' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.channel} />
                {formik.touched.channel && formik.errors.channel ? <span style={{color: 'red'}}>{formik.errors.channel}</span> : null}
                <button>Submit</button>
            </form>
        </div>
    )
}

export default OldYoutubeForm;
