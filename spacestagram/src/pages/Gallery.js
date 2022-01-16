import React, {useState, useEffect} from "react";
import Row from 'react-bootstrap/Row'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "react-datetime/css/react-datetime.css";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import "../index.css"
import { useSelector } from "react-redux";
import ImageModal from "../components/ImageModal";
import Images from "../components/Images";

function Gallery() {

    const [savedImagesGallery, setSavedImagesGallery] = useState([]);
    const [likedImagesGallery, setLikedImagesGallery] = useState([]);
    const loaderColor = '#0C6EFD';
    const [loading, setLoading] = useState(true);
    const sessionGalleryImages = useSelector((state) => state.session.imageGallery);
    const fullscreen = true;
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentModalImg, setCurrentModalImg] = useState({});
    const [tabKey, setTabKey] = useState('liked');

    const override = css`
        display: block;
        margin: 25% 0%;
        border-color: #0C6EFD;
        z-index: 100;
        position: fixed;
    `;

    useEffect(() => {
        if(Object.keys(sessionGalleryImages).length > 0){
            getAllImagesData();
        }else{
            setLoading(false);
        }
    }, [sessionGalleryImages])

    const manageImageModal = (status, img, type) => {
        
        if(type === 'liked'){
            img.type = 'liked';
        }else if(type === 'saved'){
            img.type = 'saved';
        }
        if(status){
            setCurrentModalImg(img);
        }else{
            setCurrentModalImg({});
        }
        setShowImageModal(status);
    }

    const manageImage = (image, action, status, type) => {
        
      
        let imgArr = [];
        if(type === 'liked'){
            imgArr = sessionGalleryImages['liked'];
        }else if(type === 'saved'){
            imgArr = sessionGalleryImages['saved'];
        }

        let images = imgArr.map((item, idx) => {
            if(item.id === image.id){
                if(action === 'like'){
                    item.liked = status;
                    let temp = {};
                    temp[item.id] = status;
                }else if(action === 'save'){
                    item.saved = status;
                    let temp = {};
                    temp[item.id] = status;
                }
            }
            return item;
        });

        let newLikedImages = []; 
        let newSavedImages = []; 

        if(type === 'liked'){
            newLikedImages = images.filter(item => {
                return item.liked;
            })
        }else if(type === 'saved'){
            newSavedImages = images.filter(item => {
                return item.saved;
            })
        }else if(type === 'modal'){
            if(image.type === 'liked'){
                newLikedImages = images.filter(item => {
                    return item.liked;
                })
            }else if(image.type === 'saved'){
                newSavedImages = images.filter(item => {
                    return item.saved;
                })
            }
        }
        
        if(type === 'modal'){
            if(image.type === 'liked'){
                setLikedImagesGallery(newLikedImages);
            }else if(image.type === 'saved'){
                setSavedImagesGallery(newSavedImages);
            }
        }else if(type === 'liked'){
            setLikedImagesGallery(newLikedImages);
        }else if(type === 'saved'){
            setSavedImagesGallery(newSavedImages);
        }
        
    }


    const getAllImagesData = () => {
        setLoading(false);
        let likedImages = sessionGalleryImages['liked'].filter(item => {
            return item.liked;
        })
        let savedImages = sessionGalleryImages['saved'].filter(item => {
            return item.saved;
        })
        setLikedImagesGallery(likedImages);
        setSavedImagesGallery(savedImages);
    }

    return (
        <div>
            <ImageModal show={showImageModal} fullscreen={fullscreen} modalImage={currentModalImg} handleImageModal={manageImageModal} handleImage={manageImage} source={{'source': 'gallery', 'type': 'modal'}}/>
            <PulseLoader color={loaderColor} loading={loading} css={override} size={30} />
            <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} defaultActiveKey="liked" id="gallery_tabs">
                <Tab eventKey="liked" title={<div><FontAwesomeIcon color={'#ED4956'} icon={tabKey==='liked'?faHeartSolid:faHeart} size="1x" style={{ margin: '0px 10px 0px 0px'}} /><span style={{ color: 'black' }}>Liked Photos</span></div>}>
                        <div style={{ margin: '0px 0px 0px 0px'}}>
                            <Row style={{ margin: '0px', padding: '0px' }}>
                                {loading?'':<Images handleImage={manageImage} images={likedImagesGallery} handleImageModal={manageImageModal} source={{'source': 'gallery', 'type': 'liked'}}/>}
                            </Row>
                        </div>
                </Tab>
                <Tab eventKey="saved" title={<div><FontAwesomeIcon color={'#0C6EFD'} icon={tabKey==='saved'?faBookmarkSolid:faBookmark} size="1x" style={{ margin: '0px 10px 0px 0px'}} /><span style={{ color: 'black' }}>Saved Photos</span></div>}>
                <div style={{ margin: '0px 0px 0px 0px'}}>
                        <Row style={{ margin: '0px', padding: '0px' }}>
                        {loading?'':<Images handleImage={manageImage} images={savedImagesGallery} handleImageModal={manageImageModal}  source={{'source': 'gallery', 'type': 'saved'}}/>}
                        </Row>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default Gallery;
