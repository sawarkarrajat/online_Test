import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect } from "react";
/**
 * 
 * @param {Object} props - contains props to set dialogue open or close
 * @returns {HTMLBodyElement} - returns dialogue component
 */
export default function ADialog(props) {
  /**
   * @type{hook}
   */
  const [open, setOpen] = React.useState(props.status);
  /**
   * @method - runs on change of props and for initial loading
   */
  useEffect(() => {
    setOpen(props.status);
  },[props.status]);
  /**
   * @property{Function} - function to handle dialog close
   */
  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };
  /**
   * @property{Function} - function to handle agreement
   */
  const handleAgree = () => {
    setOpen(false);
    props.handleAgree();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you wish to submit the test?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center" }}
          >
            your marks will be calculated on the basis of attempted questions.{" "}
            <i>
              "Unattended questions will not be considered for marks evalution"
            </i>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
