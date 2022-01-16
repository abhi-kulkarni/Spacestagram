import React, {useState} from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import moment from 'moment'

function DateFilter(props) {

    let sDate = new Date();
    let eDate = new Date();
    sDate.setMonth(sDate.getMonth() - 3);
    let startDateObj = moment(sDate);
    let endDateObj = moment(eDate);

    const today = moment();
    const requiredDate = moment('1995-06-15');

    const disableFutureDate = (current) => {
        return current.isBefore(today) && current.isAfter(requiredDate)
    }

    const [startDate, setStartDate] = useState(startDateObj);
    const [endDate, setEndDate] = useState(endDateObj);
    const [dateErrorMsg, setDateErrorMsg] = useState("");

    const startDateProps = {
        placeholder: 'Start Date',
        disabled: false,
    };

    const endDateProps = {
        placeholder: 'End Date',
        disabled: false,
    };

    const searchImages = () => {
        if(startDate.isAfter(endDate)){
            setDateErrorMsg('Start date should be after end date.');
            setTimeout(() => {
                setDateErrorMsg("")
            }, 5000);
        }else if(startDate && endDate){
            props.handleFilterByDate(startDate, endDate);
        }else{
            setDateErrorMsg('Enter a valid start date and end date.');
            setTimeout(() => {
                setDateErrorMsg("")
            }, 5000);
        }
    }

    return (
        <Row style={{ margin: '10px 0px', padding: '0px' }}>
                <Col style={{ margin: '0px', padding: '10px' }} xs={12} sm={12} md={12} lg={4} xl={4}>
                    {/* <Form.Control type="text" placeholder="Search" />
                     */}
                    <Datetime isValidDate={disableFutureDate} dateFormat="DD-MM-YYYY" onChange={setStartDate} value={startDate} timeFormat={false} inputProps={startDateProps}/>
                </Col>
                <Col style={{ margin: '0px', padding: '10px' }} xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Datetime isValidDate={disableFutureDate} dateFormat="DD-MM-YYYY" onChange={setEndDate} value={endDate} timeFormat={false} inputProps={endDateProps}/>
                </Col>
                <Col style={{ margin: '0px', padding: '10px'}} xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div style={{ float: 'left' }}>
                        <OverlayTrigger
                            key='search_tooltip'
                            placement='bottom'
                            overlay={
                                <Tooltip id='search_tooltip'>
                                Search
                                </Tooltip>
                            }
                            >
                            <div>
                                <FontAwesomeIcon color={'#0C6EFD'} onClick={() => searchImages()} icon={faSearch} size="1x" style={{ cursor: 'pointer', margin: '10px 0px 0px 0px'}}/>
                            </div>
                        </OverlayTrigger>
                    </div>
                </Col>
                <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <p style={{ margin: '0px', padding: '0px', color: 'red', fontSize: '12px' }}>{dateErrorMsg}</p>
                </Col>
            </Row>
    );
}

export default DateFilter;
