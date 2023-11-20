import React from "react";
import { Modal } from "react-bootstrap";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const LargeImageGalleryModal = ({ show, handleClose, items, startIndex }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      id="photosModal"
      className="modal fade"
      dialogClassName="modal-dialog modal-dialog-centered"
      style={{marginTop:"50px"}}
    >
      <Modal.Body>
        <ImageGallery
          lazyLoad={true}
          items={items}
          showPlayButton={false}
          startIndex={startIndex}
          showNav={true}
          showIndex={false}
        />
      </Modal.Body>
    </Modal>
  );
};

export default LargeImageGalleryModal;
