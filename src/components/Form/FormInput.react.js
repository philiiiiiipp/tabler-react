// @flow

import * as React from "react";
import { Icon } from "../";
import cn from "classnames";
import FormGroup from "./FormGroup.react";

import type {
  FormEvents,
  MouseEvents,
  PointerEvents,
  FocusEvents,
} from "../../";

type FormStyle = {|
  +className?: string,
  +icon?: string,
  +position?: "append" | "prepend",
  +valid?: boolean,
  +tick?: boolean,
  +invalid?: boolean,
  +cross?: boolean,
  +feedback?: string,
  +error?: string,
  +type?: string,
  +placeholder?: string,
  +name?: string,
  +value?: string | number,
  +disabled?: boolean,
  +readOnly?: boolean,
  +checked?: boolean,
|};

export type Props = {|
  ...FormStyle,
  ...FormEvents,
  ...MouseEvents,
  ...PointerEvents,
  ...FocusEvents,
  +placeholder?: string,
  +type?: "checkbox" | "radio" | "text" | "email" | "password",
  +value?: string | number | boolean,
  /**
   * Wraps the input in Form.Group and adds a label
   */
  +label?: string,
  +autocomplete?: "on" | "off",
|};

/**
 * A an input field
 */
function FormInput(props: Props): React.Node {
  const {
    className,
    name,
    icon,
    position = "prepend",
    valid,
    tick,
    invalid,
    cross,
    error,
    placeholder,
    value,
    checked,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    label,
    autocomplete,
  } = props;
  const type = props.type || "text";

  const classes = cn(
    {
      "form-control": type !== "checkbox" && type !== "radio",
      "custom-control-input": type === "checkbox" || type === "radio",
      "is-valid": valid,
      "state-valid": tick,
      "is-invalid": invalid || !!error,
      "state-invalid": cross || !!error,
    },
    className
  );

  const feedback = error || props.feedback;

  const allInputProps = {
    name,
    className: classes,
    type,
    placeholder,
    value,
    disabled,
    readOnly,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    autocomplete,
  };

  const contents = !icon ? (
    <React.Fragment>
      {type === "checkbox" || type === "radio" ? (
        <input {...allInputProps} checked={checked} />
      ) : (
        <input {...allInputProps} />
      )}
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="input-icon">
        {position === "prepend" && (
          <span className="input-icon-addon">
            <Icon name={icon} />
          </span>
        )}
        <input {...allInputProps} />
        {position === "append" && (
          <span className="input-icon-addon">
            <Icon name={icon} />
          </span>
        )}
      </div>
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>
  );

  return label ? <FormGroup label={label}>{contents}</FormGroup> : contents;
}

FormInput.displayName = "Form.Input";

/** @component */
export default FormInput;
