import Modal from "react-bootstrap/esm/Modal";

export default function DeleteDialog({ assignmentId, onConfirm, show, onHide }: {
  assignmentId: string | null; onConfirm: (id: string) => void;
  show: boolean; onHide: () => void;
}) {
  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Confirm Deletion </h1>
        </div>
        <div className="modal-body">
          Delete Assignment?
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onHide}>
            No
          </button>
          <button className="btn btn-danger" onClick={() => assignmentId && onConfirm(assignmentId)}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
}
