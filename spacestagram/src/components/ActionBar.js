import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faCopyright } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid, faBookmark as faBookmarkSolid, faCamera } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "../index.css"

function ActionBar(props) {

    const currentModalImg = props.modalImage;
    
    let savedImages = props.source.type !== 'modal'?props.source.type === 'saved':props.modalImage.type === 'saved';
    let likedImages = props.source.type !== 'modal'?props.source.type === 'liked':props.modalImage.type === 'liked';
    
    let source = props.source;

    const manageImage = (image, action, status) => {
        let type = '';
        if(source.type === 'modal'){
            if(image.type === 'liked'){
                type = 'liked';
            }else if(image.type === 'saved'){
                type = 'saved';
            }
        }else if(source.type === 'liked'){
            type = 'liked';
        }else if(source.type === 'saved'){
            type = 'saved';
        }else if(source.type === 'all_images'){
            type = 'all_images';
        }
        props.handleImage(image, action, status, type);
    }

    return (
        <Row style={{ margin: '0px', padding: '0px' }}>
            <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <div style={{ margin: '0px'}}>
                    {currentModalImg.copyright?<span style={{ float: 'left', margin: '0px 0px 10px 0px', fontWeight:'bold', color: 'gray', fontSize: '10px' }}>
                        <OverlayTrigger
                            key='copyright_tooltip'
                            placement='bottom'
                            overlay={
                                <Tooltip id='copyright_tooltip'>
                                Copyright by {currentModalImg.copyright} 
                                </Tooltip>
                            }
                            >
                            <div>
                                <FontAwesomeIcon icon={faCopyright} size="1x" style={{ textAlign: 'center', margin: '5px 5px 0px 0px', fontSize: '15px' }}/> {currentModalImg.copyright}
                            </div>
                        </OverlayTrigger>
                    </span>:''}
                    {currentModalImg.date?<span style={{ float: 'right', margin: '0px 0px 10px 0px', fontWeight: 'bold', color: 'gray', fontSize: '10px' }}>
                    <OverlayTrigger
                        key='taken_by_tooltip'
                        placement='bottom'
                        overlay={
                            <Tooltip id='taken_by_tooltip'>
                            Taken on {currentModalImg.date}
                            </Tooltip>
                        }
                        >
                        <div>
                            <FontAwesomeIcon icon={faCamera} size="1x" style={{ textAlign: 'center', margin: '5px 5px 0px 0px', fontSize: '15px' }}/> {currentModalImg.date}
                        </div>
                    </OverlayTrigger>
                    </span>:''}
                </div>
            </Col>
             
            <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="actionsContainerModal">
                    
                    {!savedImages?currentModalImg.liked?<FontAwesomeIcon className="likeIcon" color={'#ED4956'} onClick={() => manageImage(currentModalImg, 'like', false)} pull="left" icon={faHeartSolid} size="2x"/>:
                    <FontAwesomeIcon className="unlikeIcon" onClick={() => manageImage(currentModalImg, 'like', true)} pull="left" icon={faHeart} size="2x"/>:''}
                    
                    {!likedImages?currentModalImg.saved?<FontAwesomeIcon className="saveIcon" color={'#0C6EFD'} onClick={() => manageImage(currentModalImg, 'save', false)} pull="left" icon={faBookmarkSolid} size="2x"/>:
                    <FontAwesomeIcon  className="unSaveIcon" onClick={() => manageImage(currentModalImg, 'save', true)} pull="left" icon={faBookmark} size="2x"/>:''}
                
                </div>
            </Col>
        </Row>
    );
}

export default ActionBar;
