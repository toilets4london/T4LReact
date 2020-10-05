import React, { useState } from "react";
import { Alert } from 'react-bootstrap';

export default function DismissableAlert(props) {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" className="error-alert" onClose={() => setShow(false)} dismissible>
          <p>
            {props.message}
          </p>
        </Alert>
      );
    }
    return null;
  }
  