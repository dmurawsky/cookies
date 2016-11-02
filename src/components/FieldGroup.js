import React, {PropTypes} from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const FieldGroup = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
};

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FieldGroup;
