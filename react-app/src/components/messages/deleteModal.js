import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';

function EditCommentModal({commentId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment commentId={commentId}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
