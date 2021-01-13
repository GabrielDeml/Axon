import React, { ReactElement } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const RENAME_PROJECT_MUTATION = gql`
  mutation RenameProject($id: ID!, $newName: String!) {
    renameProject(id: $id, newName: $newName) {
      id
      name
    }
  }
`;

export default function RenameProjectDialog(props: { id: string }): ReactElement {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [renameProject] = useMutation(RENAME_PROJECT_MUTATION);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRename = () => {
    renameProject({ variables: { id: props.id, newName } });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Rename</Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Rename Project</DialogTitle>
        <DialogContent dividers>
          <TextField
            onChange={(event) => setNewName(event.target.value)}
            autoFocus
            margin="dense"
            label="New Project Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleRename} color="primary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}