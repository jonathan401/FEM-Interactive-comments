import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type DialogContextType = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const contextValues = {
    dialogOpen,
    setDialogOpen,
  };

  return (
    <DialogContext.Provider value={contextValues}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext can only be used in the DialogProvider");
  }
  return context;
};
