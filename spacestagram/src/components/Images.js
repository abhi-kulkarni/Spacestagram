import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import "react-datetime/css/react-datetime.css";
import "../index.css"
import { useDispatch } from "react-redux";
import {
    sessionImageGallery
  } from "../redux";
import ActionBar from "./ActionBar";
import Paginate from "../components/Paginate";

function Images(props) {

    const dispatch = useDispatch();

    const imageGallery = props.images;
        
    const [currentImages, setCurrentImages] = useState([]);

    const itemsPerPage = 12;

    let source  = props.source;

    useEffect(() => {
        const endOffset = itemsPerPage;
        let currentItems = (props.images).slice(0, endOffset);
        setCurrentImages(currentItems);
    }, [props.images])

    const manageImageModal = (status, img) => {
        props.handleImageModal(status, img, source.type);
    }

    const readMore = (image, modal) => {
        let dots = {};
        let moreText = {};
        let readMoreText = {};
        let explanationText = {};

        if(modal){
            dots = document.getElementById("dots_modal_"+image.id);
            moreText = document.getElementById("more_modal_"+image.id);
            readMoreText = document.getElementById("readMore_modal_"+image.id);  
            explanationText = document.getElementById("imageExplanation_modal_"+image.id);    
        }else{
            dots = document.getElementById("dots_"+image.id);
            moreText = document.getElementById("more_"+image.id);
            readMoreText = document.getElementById("readMore_"+image.id);  
            explanationText = document.getElementById("imageExplanation_"+image.id);
        }
        if (dots.style.display === "none") {
          dots.style.display = "inline";
          moreText.style.display = "none";
          readMoreText.innerHTML = 'Read more';
          explanationText.innerHTML = image.explanation.slice(0, 100);
        } else {
          explanationText.innerHTML = image.explanation;
          dots.style.display = "none";
          moreText.style.display = "inline";
          readMoreText.style.margin = "0px 0px 0px 5px";
          readMoreText.innerHTML = 'Read less';
        }
      }
    
    const handleCurrentItemsMethod = (currentItems) => {
        setCurrentImages(currentItems);
    }

    const manageImage = (image, action, status, type) => {
        
        if(type === 'liked' || type === 'saved'){
            props.handleImage(image, action, status, type)
        }else{
            let images = currentImages.map((item, idx) => {
                if(item.id === image.id){
                    let temp = {};
                    temp[item.id] = status;
                    if(action === 'like'){
                        item.liked = status;
                    }else if(action === 'save'){
                        item.saved = status;
                    }
                }
                return item;
            });
            
            let tempDict = {};
            let likedImages = images.filter(item => {
                return item.liked;
            })
            let savedImages = images.filter(item => {
                return item.saved;
            })
            tempDict['liked'] = likedImages;
            tempDict['saved'] = savedImages;
            
            dispatch(sessionImageGallery(tempDict));
            setCurrentImages(images);
        }
    }

    return (
        <Row style={{ margin: '0px', padding: '0px' }}>
            {currentImages.length > 0?currentImages.map((item, idx) => {
                return (
                <Col style={{ border: '0.1px solid lightgray', padding: '10px', borderRadius: '10px' }} key={idx} xs={12} sm={12} md={6} lg={4} xl={4}>
                    <div>
                        <p style={{ textAlign: 'center', margin: '0px 0px 5px 0px', fontWeight: 'bold', color: 'gray', fontSize: '14px' }}>{item.title}</p>
                        <div className="imageContainer">
                            <img onClick={() => manageImageModal(true, item)} className="image" src={item.hdurl} alt={"NASA_IMG_"+idx}/>
                        </div>
                        <ActionBar source={source} modalImage={item} handleImage={manageImage}/>
                        <p style={{ textAlign: 'left', float: 'left', fontSize: '12px', color: 'gray' }}>
                            <span className="imageExplanation" id={"imageExplanation_"+item.id}>{item.explanation.slice(0, 100)}</span>
                            <span className="dots" id={"dots_"+item.id}>...</span><span className="readMore" id={"readMore_"+item.id} onClick={() => readMore(item, false)}>Read more</span><span className="more" id={"more_"+item.id}></span>
                        </p>
                    </div>
                </Col>
            )
            }):<h2 style={{ margin: '15% 0%', color: '#0C6EFD' }}><p>No <span>{source.type === 'saved'?'Saved': source.type === 'liked'?'Liked':''}</span> Images Yet ... !</p></h2>}
            {currentImages.length > 0?<Paginate images={imageGallery} handleCurrentItems={handleCurrentItemsMethod}/>:''}
        </Row>
    );
}

export default Images;
