import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col'
import ReactPaginate from "react-paginate";

function Paginate(props) {
    
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 12;
    const [itemOffset, setItemOffset] = useState(0);
    const imageGallery = props.images;
    
    useEffect(() => {
        paginationMethod();
    }, []);
    
    const paginationMethod = (newOffset) => {

        let itemOffsetObj = newOffset?newOffset:itemOffset;
        const endOffset = itemOffsetObj + itemsPerPage;
        let currentItems = imageGallery.slice(itemOffsetObj, endOffset);
        setPageCount(Math.ceil(imageGallery.length / itemsPerPage));
        props.handleCurrentItems(currentItems)
    }

    const handlePageClick = (event) => {

        let newOffset = (event.selected * itemsPerPage) % imageGallery.length;
        setItemOffset(newOffset);
        paginationMethod(newOffset);
    };

    return (
        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ margin: '0px', padding: '20px 20px 0px 20px' }}>
            <ReactPaginate
                    id="paginate"
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
        </Col>
    );
}

export default Paginate;
