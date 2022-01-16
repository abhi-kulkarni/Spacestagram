import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import "react-datetime/css/react-datetime.css";
import "../index.css"
import ActionBar from "./ActionBar";

function ImageModal(props) {

    const currentModalImg = props.modalImage;
    const fullScreen = props.fullscreen;
    const [showModal, setShowModal] = useState(false);
    const source = props.source;

    useEffect(() => {
        setShowModal(props.show);
    }, [props.show])
    
  
    const manageImageModal = (status, img) => {
        setShowModal(false);
        props.handleImageModal(status, img);
    }

    const manageImage = (image, action, status, type) => {
        props.handleImage(image, action, status, type)
    }

    return (
        
        <Modal show={showModal} fullscreen={fullScreen} onHide={() => manageImageModal(false, {})}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body style={{ margin: '0 auto', height: '600px' }}>
                <Row style={{ margin: '0px', padding: '0px'}}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                        <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'gray', fontSize: '14px' }}>{currentModalImg.title}</p>
                        <img id="modalImage" src={currentModalImg.hdurl} style={{ objectFit: 'contain', height: '600px', width: '100%' }} alt={"NASA_IMG_"+currentModalImg.id}/>
                    </Col>
                    <Col style={{ margin: '0px', padding: '35px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p style={{ textAlign: 'left', float: 'left', fontSize: '12px', color: 'gray' }}>
                                    <span className="imageExplanation" id={"imageExplanation_modal_"+currentModalImg.id}>{currentModalImg && Object.keys(currentModalImg).length > 0?currentModalImg.explanation:''}</span>
                                </p>
                            </Col>
                            <ActionBar source={source} modalImage={currentModalImg} handleImage={manageImage}/>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default ImageModal;
