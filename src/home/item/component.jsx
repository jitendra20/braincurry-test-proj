import React, { useRef } from 'react'
import './styles.css'

export default function HomeItemComponent({ item }) {

  const modalRef = useRef();

  function showImageModal() {
    modalRef.current.style.display = "block";
  }

  function closeImageModal() {
    modalRef.current.style.display = "none"
  }

  return (
    <>
      <div className="item-container">
        <div className="image-container">
          <div className="overlay" onClick={showImageModal}>
            <span>
              Click me to enlarge
            </span>
          </div>
          <img loading="lazy" src={item.download_url} alt="" />
        </div>
        <div className="item-text-container">
          <h4>
            <span> Lorem ipsum dolor sit amet</span>
          </h4>
        </div>
      </div>

      <div ref={modalRef} className="modal">
        <span className="close" onClick={closeImageModal}>&times;</span>
        <img className="modal-content" id="img01" src={item.download_url} alt="" />
      </div>
    </>

  )
}
