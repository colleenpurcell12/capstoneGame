import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const validate = values => {
  const errors = {}
  const requiredFields = [  ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}


const SubmitForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit} onChange={(e) => console.log(e.target.value)}>
      <div>
        <Field name="color" component={RadioButtonGroup}>
          <RadioButton value="red" label="red"/>
          <RadioButton value="blue" label="blue"/>
          <RadioButton value="green" label="green"/>
          <RadioButton value="brown" label="brown"/>
        </Field>
      </div>
      <div>
        <button type="submit" disabled={false} value="submit">Submit</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'SubmitForm',  // a unique identifier for this form
  validate,
  null
})(SubmitForm)
