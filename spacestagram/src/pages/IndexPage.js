import React, {useState, useEffect} from "react";
import { NASA_API_URL } from "../constants"
import axios from "axios"
import "react-datetime/css/react-datetime.css";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import "../index.css"
import Images from "../components/Images";
import ImageModal from "../components/ImageModal";
import DateFilter from "../components/DateFilter";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {sessionImages, sessionDateFilter} from '../redux'

function IndexPage(props) {

    const [imageGallery, setImageGallery] = useState([]);
    const loaderColor = '#0C6EFD';
    const [loading, setLoading] = useState(false);
    const fullscreen = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentModalImg, setCurrentModalImg] = useState({});
    const sessionImagesArr = useSelector((state) => state.session.images);
    const dispatch = useDispatch();

    const override = css`
        display: block;
        margin: 25% 45%;
        border-color: #0C6EFD;
        z-index: 100;
        position: fixed;
    `;
    
    useEffect(() => {
        if(sessionImagesArr.length > 0){
            setImageGallery(sessionImagesArr);
        }else{
            let sDate = new Date();
            let eDate = new Date();
            sDate.setMonth(sDate.getMonth() - 3);
            let startDateObj = moment(sDate).format("YYYY-MM-DD");
            let endDateObj = moment(eDate).format("YYYY-MM-DD");
            getAllImagesData(startDateObj, endDateObj, true);
        }
    }, [sessionImagesArr])
    
    const manageImageModal = (status, img) => {
        if(status){
            setCurrentModalImg(img);
        }else{
            setCurrentModalImg({});
        }
        setShowImageModal(status);
    }
    
    const manageImage = (image, action, status) => {
        
        let images = imageGallery.map((item, idx) => {
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
       
        setImageGallery(images);
    }
    
    const getAllImagesData = (startDate, endDate, init) => {
        if(!init){
            startDate = moment(startDate).format('YYYY-MM-DD');
            endDate = moment(endDate).format('YYYY-MM-DD');
        }
        setLoading(true);
        let imgUrl = 'https://api.nasa.gov/planetary/apod?api_key='+NASA_API_URL+'&start_date='+startDate+'&end_date='+endDate;
        axios.get(imgUrl).then(res => {
            setLoading(false);
            let images = res.data.filter((item, idx) => {
                item['id'] = idx;
                return item.media_type === 'image';
            });
            setImageGallery(images);
            dispatch(sessionImages(images));
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

    const searchImages = (startDate, endDate) => {
        if(startDate && endDate){
            getAllImagesData(startDate, endDate, false);   
        }
    }

    return (
        <div style={{ margin: '0px 0px 50px 0px'}}>
            <ImageModal show={showImageModal} fullscreen={fullscreen} modalImage={currentModalImg} handleImageModal={manageImageModal} handleImage={manageImage} source={{'source': 'gallery', 'type': 'modal'}}/>
            <PulseLoader color={loaderColor} loading={loading} css={override} size={30} />
            <DateFilter handleFilterByDate={searchImages}/>
            {loading?'':<Images images={imageGallery} handleImageModal={manageImageModal} source={{'source': 'index', 'type': 'all_images'}}/>}
        </div>
    );
}

export default IndexPage;
