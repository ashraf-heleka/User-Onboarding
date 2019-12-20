import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// removed
// state
// onSubmit
// onChange

const OnboardForm = ({ values, errors, touched, status }) => {
  const [onboards, setOnboards] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setOnboards(onboards => [...onboards, status]);
  }, [status]);
  return (
    <div className="onboard-form">
      <Form>
        <label htmlFor="name">Name:</label>
        <Field id="name" type="text" name="name" />
        {touched.name && errors.name && (
          <p className="errors">{errors.name}</p>
        )}
        <label htmlFor="email">Email</label>
        <Field id="email" type="text" name="email" />
        {touched.email && errors.email && <p className="errors">{errors.size}</p>}
        <label htmlFor="password">Password</label>
        <Field id="password" type="text" name="password" />
        {touched.password && errors.password && <p className="errors">{errors.password}</p>}
        
        <label htmlFor="tos" className="checkbox-container">
          Terms of Service
          <Field
            id="tos"
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          {touched.tos && errors.tos && (
            <p className="errors">{errors.tos}</p>
          )}
          <span className="checkmark" />
        </label>
        <Field as="textarea" type="text" name="notes" placeholder="Notes" />
        <button type="submit">Submit!</button>
      </Form>
      {onboards.map(onboard => (
        <ul key={onboard.id}>
          <li>Name: {onboard.name}</li>
          <li>Email: {onboard.email}</li>
          <li>Password: {onboard.password}</li>
          <li>Notes: {onboard.notes}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikOnboardForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: "",
      password: "",
      tos: tos || false,
      notes: ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Is Required"),
    email: Yup.string().required("Is Required"),
    password: Yup.string().required("Is Required").min(6, 'Password should be at least 6 letters.').matches(/[a-zA-Z]/, 'Password can only contain letters.'),
    tos: Yup.boolean().oneOf([true], "Must agree to Terms of Service")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(OnboardForm);
// replaced AnimalForm with FormikAnimalForm
export default FormikOnboardForm;
