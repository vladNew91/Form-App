import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const alertTime = 5000;

interface ErrorAlertComponentProps {
  error: string;
}

export const ErrorAlertComponent: React.FC<ErrorAlertComponentProps> = ({
  error,
}: ErrorAlertComponentProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);

  const closeAlert = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    setTimeout(closeAlert, alertTime);
  }, [closeAlert]);

  return (
    <Box sx={{ position: "fixed", right: 0, bottom: 0, p: 1 }}>
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  );
};
