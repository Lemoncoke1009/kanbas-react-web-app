import React, { useEffect, useRef } from 'react';

export default function ModuleEditor({ 
  dialogTitle, 
  moduleName, 
  setModuleName, 
  addModule 
}: {
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        // Remove focus when modal is hidden
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });

      modal.addEventListener('shown.bs.modal', () => {
        // Set focus to close button when modal opens
        closeButtonRef.current?.focus();
      });
    }
  }, []);

  return (
    <div 
      id="wd-add-module-dialog" 
      className="modal fade" 
      ref={modalRef}
      data-bs-backdrop="static" 
      data-bs-keyboard="false"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="moduleDialogTitle"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="moduleDialogTitle">
              {dialogTitle}
            </h1>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal"
              ref={closeButtonRef}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input 
              className="form-control" 
              value={moduleName}
              placeholder="Module Name"
              onChange={(e) => setModuleName(e.target.value)}
              aria-label="Module name"
            />
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                addModule();
                // Clear the input after adding
                setModuleName('');
              }} 
              type="button" 
              data-bs-dismiss="modal" 
              className="btn btn-danger"
            >
              Add Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
    