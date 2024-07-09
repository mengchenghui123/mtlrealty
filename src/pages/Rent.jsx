import { useState } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import SquareItem from '../components/SquareItem/SquareItem';
import Filters from '../components/Filters/Filters';
import data from '../utils/moreData.json'

const Rent = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPage = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  }

  const renderPagination = () => {
    const pages = [];
    if (totalPage <= 3) {
      for (let i = 0; i < totalPage; i++) {
        pages.push(
          <button
            className={i === currentPage ? 'active' : ''}
            key={i}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      if (currentPage < 2) {
        for (let i = 0; i < 3; i++) {
          pages.push(
            <button
              className={i === currentPage ? 'active' : ''}
              key={i}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </button>
          );
        }
        pages.push(<button className='ellipsis' key='ellipsis-right'>...</button>);
      } else if (currentPage >= 2 && currentPage < totalPage - 2) {
        pages.push(<button className='ellipsis' key='ellipsis-left'>...</button>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              className={i === currentPage ? 'active' : ''}
              key={i}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </button>
          );
        }
        pages.push(<button className='ellipsis' key='ellipsis-right'>...</button>);
      } else {
        pages.push(<button className='ellipsis' key='ellipsis-left'>...</button>);
        for (let i = totalPage - 3; i < totalPage; i++) {
          pages.push(
            <button
              className={i === currentPage ? 'active' : ''}
              key={i}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </button>
          );
        }
      }
    }
    return pages
  };

  return (
    <div className="rent-page">
      <Header />
      <div className="container">
        <div className='content-box'>
          <h1 className='title'>Rent Listings</h1>
          <div className='break-line' />
          <Filters />
          <div className="rent-list">
            {currentPageData.map((item) => (
              <SquareItem key={item.id} item={item} />
            ))}
          </div>
          <div className='break-line' />
          <div className='pagination-container'>
            <button className='prev'
              onClick={() => { handlePageChange(currentPage - 1) }}
              disabled={currentPage === 0}
            >
              prev
            </button>
            {renderPagination()}
            <button className='next'
              onClick={() => { handlePageChange(currentPage + 1) }}
              disabled={currentPage === totalPage - 1}
            >
              next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rent;