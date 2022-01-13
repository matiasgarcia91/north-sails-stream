import Dialog from "@reach/dialog";

export const Modal = ({ isOpen, children }) => {
  return (
    <Dialog
      isOpen={isOpen}
      style={{
        borderRadius: "10px",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.04)",
        padding: "32px",
      }}
    >
      {children}
    </Dialog>
  );
};
