import { Button, Dialog,DialogActions,DialogContent,DialogTitle, Stack} from "@mui/material"


const ConfirmDiglogs = ({open,handleclose,deletehanlder}) => {
  return (
    <Stack>
      <Dialog open={open} onClose={handleclose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            Are You Sure You Want to delete this Group?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclose}>No</Button>
          <Button onClick={deletehanlder} color="error">Yes</Button>
        </DialogActions>
    </Dialog>
    </Stack>
    
  )
}

export default ConfirmDiglogs