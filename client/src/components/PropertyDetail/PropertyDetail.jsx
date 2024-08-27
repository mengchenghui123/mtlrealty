import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProperty from "../../Hook/useProperty";
import { PuffLoader } from "react-spinners";
import useAuthCheck from "../../Hook/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../BookingModal/BookingModal";
import UserDetailContext from "../../context/userDetailContext";
import { useMutation } from "react-query";
import { removeBooking } from "../../utils/Api";
import { toast } from "react-toastify";
import Heart from "../Heart/Heart";

export const PropertyDetail = () => {
  const { data, isError, isLoading } = useProperty();
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetail,
  } = useContext(UserDetailContext);

  useEffect(() => {
    document.body.className = "inner-pages sin-1 homepage-4 hd-white";

    // Cleanup on unmount
    return () => {
      document.body.className = "";
    };
  }, []);
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetail((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error loading Properties</span>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const property = data.find((p) => p.id === id);
  if (!property) {
    return (
      <div className="container mt-5">
        <h2>property Not Found</h2>
      </div>
    );
  }
  const batches = [];
  const images = property.images || [];

  for (let i = 0; i < images.length; i += 4) {
    const currentBatch = images.slice(i, i + 4);
    while (currentBatch.length < 4) {
      currentBatch.push(...images.slice(0, 4 - currentBatch.length));
    }
    batches.push(currentBatch);
  }

  const handlePageChange = (index) => {
    setCurrentBatchIndex(index);
  };

  return (
    <section className="single-proper blog details">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 blog-pots">
            <div className="row">
              <div className="col-md-12">
                <section className="headings-2 pt-0">
                  <div className="pro-wrapper">
                    <div className="detail-wrapper-body">
                      <div className="listing-title-bar">
                        <h3>{property.title}</h3>

                        <div className="mt-0">
                          <a
                            href="#listing-location"
                            className="listing-address"
                          >
                            <i className="fa fa-map-marker pr-2 ti-location-pin mrg-r-5" />
                            {property.address}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="single detail-wrapper mr-2">
                      <div className="detail-wrapper-body">
                        <div className="listing-title-bar">
                          <h4>${property.price.toLocaleString("en-US")}</h4>
                          <div className="mt-0">
                            <a
                              href="#listing-location"
                              className="listing-address"
                            >
                              <p>
                                {" "}
                                Living Space:{" "}
                                {property.livingSpace
                                  ? `${property.livingSpace} sq ft`
                                  : "Not Available"}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* main slider carousel items */}
                <div
                  id="listingDetailsSlider"
                  className="carousel listing-details-sliders slide mb-30"
                >
                  <h5 className="mb-4">Gallery</h5>
                  <div className="carousel-inner">
                    {batches[currentBatchIndex].map((image, index) => (
                      <div
                        key={index}
                        className={`${
                          index === 0 ? "active" : ""
                        } item carousel-item`}
                        data-slide-number={index}
                      >
                        <img
                          src={image}
                          className="img-fluid"
                          alt={`slider-listing-${index}`}
                        />
                      </div>
                    ))}
                  </div>

                  <a
                    className="carousel-control left"
                    href="#listingDetailsSlider"
                    data-slide="prev"
                  >
                    <i className="fa fa-angle-left" />
                  </a>
                  <a
                    className="carousel-control right"
                    href="#listingDetailsSlider"
                    data-slide="next"
                  >
                    <i className="fa fa-angle-right" />
                  </a>

                  <ul className="carousel-indicators smail-listing list-inline">
                    {batches[currentBatchIndex].map((image, index) => (
                      <li
                        key={index}
                        className={`list-inline-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <a
                          id={`carousel-selector-${index}`}
                          className={`${index === 0 ? "selected" : ""}`}
                          data-slide-to={index}
                          data-target="#listingDetailsSlider"
                        >
                          <img
                            src={image}
                            className="img-fluid"
                            alt={`listing-small-${index}`}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="carousel-pagination">
                    {batches.map((_, pageIndex) => (
                      <button
                        key={pageIndex}
                        className={`page-btn ${
                          currentBatchIndex === pageIndex ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(pageIndex)}
                      >
                        {pageIndex + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="blog-info details mb-30">
                  <h5 className="mb-4">Description</h5>
                  <p className="mb-3">{property.description}</p>
                </div>
              </div>
            </div>
            <div className="single homes-content details mb-30">
              {/* title */}
              <h5 className="mb-4">Property Details</h5>
              <ul className="homes-list clearfix">
                <li>
                  <span className="font-weight-bold mr-1">mlsNumber:</span>
                  <span className="det">{property.mlsNumber}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Property Type:</span>
                  <span className="det">{property.propertyType}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Living Space:</span>
                  <span className="det">{property.livingSpace}sqft</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Lot Size:</span>
                  <span className="det">{property.lotSize}sqft</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Rooms:</span>
                  <span className="det">{property.rooms.length}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Bedrooms:</span>
                  <span className="det">{property.facilities.bedrooms}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Bath:</span>
                  <span className="det">{property.facilities.bathrooms}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Parking Space:</span>
                  <span className="det">{property.facilities.parking}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Year Built:</span>
                  <span className="det">{property.yearBuild}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">
                    Municipal Taxes:
                  </span>
                  <span className="det">
                    {property.municipalTaxes.toLocaleString("en-US")}
                  </span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">School Taxes:</span>
                  <span className="det">
                    {property.schoolTaxes.toLocaleString("en-US")}
                  </span>
                </li>
              </ul>
              {/* title */}
              <h5 className="mt-5">Amenities</h5>
              {/* cars List */}
              <ul className="homes-list clearfix">
                {property.amenities.map((facility, index) => (
                  <li key={index}>
                    <i className="fa fa-check-square" aria-hidden="true" />
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
            <h3>Rooms</h3>
            <table className="table table-striped mb-30">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Level</th>
                  <th>Dimensions</th>
                  <th>Flooring</th>
                </tr>
              </thead>
              <tbody>
                {property.rooms.map((room, index) => (
                  <tr key={index}>
                    <td>{room.type}</td>
                    <td>{room.level}</td>
                    <td>{room.dimensions}</td>
                    <td>{room.flooring}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="property-location map">
              <h5>Location</h5>
              <div className="divider-fade" />
              <div id="map-contact" className="contact-map" />
            </div>

            {/* Star Add Review */}
            <section className="single reviews leve-comments details">
              <div id="add-review" className="add-review-box">
                {/* Add Review */}
                <h3 className="listing-desc-headline margin-bottom-20 mb-4">
                  Add Review
                </h3>
                <span className="leave-rating-title">
                  Your rating for this listing
                </span>
                {/* Rating / Upload Button */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    {/* Leave Rating */}
                    <div className="clearfix" />
                    <div className="leave-rating margin-bottom-30">
                      <input
                        type="radio"
                        name="rating"
                        id="rating-1"
                        defaultValue={1}
                      />
                      <label htmlFor="rating-1" className="fa fa-star" />
                      <input
                        type="radio"
                        name="rating"
                        id="rating-2"
                        defaultValue={2}
                      />
                      <label htmlFor="rating-2" className="fa fa-star" />
                      <input
                        type="radio"
                        name="rating"
                        id="rating-3"
                        defaultValue={3}
                      />
                      <label htmlFor="rating-3" className="fa fa-star" />
                      <input
                        type="radio"
                        name="rating"
                        id="rating-4"
                        defaultValue={4}
                      />
                      <label htmlFor="rating-4" className="fa fa-star" />
                      <input
                        type="radio"
                        name="rating"
                        id="rating-5"
                        defaultValue={5}
                      />
                      <label htmlFor="rating-5" className="fa fa-star" />
                    </div>
                    <div className="clearfix" />
                  </div>
                  <div className="col-md-6">
                    {/* Uplaod Photos */}
                    <div className="add-review-photos margin-bottom-30">
                      <div className="photoUpload">
                        <span>
                          <i className="sl sl-icon-arrow-up-circle" /> Upload
                          Photos
                        </span>
                        <input type="file" className="upload" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 data">
                    <form action="#">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="First Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Last Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12 form-group">
                        <textarea
                          className="form-control"
                          id="exampleTextarea"
                          rows={8}
                          placeholder="Review"
                          required
                          defaultValue={""}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg mt-2"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            {/* End Add Review */}
          </div>
          <aside className="col-lg-4 col-md-12 car">
            <div className="single widget">
              {/* Start: Schedule a Tour */}
              <div className="schedule widget-boxed mt-33 mt-0">
                <div className="widget-boxed-header">
                  <h4>
                    <i className="fa fa-calendar pr-3 padd-r-10" />
                    Schedule a Tour
                  </h4>
                </div>
                <div className="widget-boxed-body">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 book">
                      <input
                        type="text"
                        id="reservation-date"
                        data-lang="en"
                        data-large-mode="true"
                        data-min-year={2017}
                        data-max-year={2020}
                        data-disabled-days="08/17/2017,08/18/2017"
                        data-id="datedropper-0"
                        data-theme="my-style"
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 book2">
                      <input
                        type="text"
                        id="reservation-time"
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mrg-top-15 mb-3">
                    <div className="col-lg-6 col-md-12 mt-4">
                      <label className="mb-4">Adult</label>
                      <div className="input-group">
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn counter-btn theme-cl btn-number"
                            disabled="disabled"
                            data-type="minus"
                            data-field="quant[1]"
                          >
                            <i className="fa fa-minus" />
                          </button>
                        </span>
                        <input
                          type="text"
                          name="quant[1]"
                          className="border-0 text-center form-control input-number"
                          data-min={0}
                          data-max={10}
                          defaultValue={0}
                        />
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn counter-btn theme-cl btn-number"
                            data-type="plus"
                            data-field="quant[1]"
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-4">
                      <label className="mb-4">Children</label>
                      <div className="input-group">
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn counter-btn theme-cl btn-number"
                            disabled="disabled"
                            data-type="minus"
                            data-field="quant[2]"
                          >
                            <i className="fa fa-minus" />
                          </button>
                        </span>
                        <input
                          type="text"
                          name="quant[2]"
                          className="border-0 text-center form-control input-number"
                          data-min={0}
                          data-max={10}
                          defaultValue={0}
                        />
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn counter-btn theme-cl btn-number"
                            data-type="plus"
                            data-field="quant[2]"
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="payment-method.html"
                    className="btn reservation btn-radius theme-btn full-width mrg-top-10"
                  >
                    Submit Request
                  </a>
                </div>
              </div>
              {/* End: Schedule a Tour */}
              {/* end author-verified-badge */}
              <div className="sidebar">
                <div className="widget-boxed mt-33 mt-5">
                  <div className="widget-boxed-header">
                    <h4>Agent Information</h4>
                  </div>
                  <div className="widget-boxed-body">
                    <div className="sidebar-widget author-widget2">
                      <div className="author-box clearfix">
                        <img
                          src="images/testimonials/ts-1.jpg"
                          alt="author-image"
                          className="author__img"
                        />
                        <h4 className="author__title">Lisa Clark</h4>
                        <p className="author__meta">Agent of Property</p>
                      </div>
                      <ul className="author__contact">
                        <li>
                          <span className="la la-map-marker">
                            <i className="fa fa-map-marker" />
                          </span>
                          302 Av Park, New York
                        </li>
                        <li>
                          <span className="la la-phone">
                            <i className="fa fa-phone" aria-hidden="true" />
                          </span>
                          <a href="#">(234) 0200 17813</a>
                        </li>
                        <li>
                          <span className="la la-envelope-o">
                            <i className="fa fa-envelope" aria-hidden="true" />
                          </span>
                          <a href="#">lisa@gmail.com</a>
                        </li>
                      </ul>
                      <div className="agent-contact-form-sidebar">
                        <h4>Request Inquiry</h4>
                        <form
                          name="contact_form"
                          method="post"
                          action="functions.php"
                        >
                          <input
                            type="text"
                            id="fname"
                            name="full_name"
                            placeholder="Full Name"
                            required
                          />
                          <input
                            type="number"
                            id="pnumber"
                            name="phone_number"
                            placeholder="Phone Number"
                            required
                          />
                          <input
                            type="email"
                            id="emailid"
                            name="email_address"
                            placeholder="Email Address"
                            required
                          />
                          <textarea
                            placeholder="Message"
                            name="message"
                            required
                            defaultValue={""}
                          />
                          <input
                            type="submit"
                            name="sendmessage"
                            className="multiple-send-message"
                            defaultValue="Submit Request"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        {/* START SIMILAR PROPERTIES */}
      </div>
    </section>

    // <div className="property-detail-page">
    //   <div className="property-detail-container">
    //     {/* 第一块，大图片 */}
    //     <div className="property-main-image">
    //       <div className="like">
    //         <Heart id={id} />
    //       </div>
    //       <img src={batches[currentBatchIndex]?.[0]} alt="Property" />
    //     </div>
    //     {/* 第二块，Swiper */}
    //     {batches.length > 0 && (
    //       <div className="property-swiper">
    //         <Swiper
    //           spaceBetween={10}
    //           slidesPerView={1}
    //           autoplay={{ delay: 2000 }}
    //           onSlideChange={handleSlideChange}
    //           loop={batches.length > 1}
    //           modules={[Autoplay]}
    //         >
    //           {batches.map((card, i) => (
    //             <SwiperSlide key={i}>
    //               <div className="swiper-batch">
    //                 {card.map((image, idx) => (
    //                   <img key={idx} src={image} alt="home" />
    //                 ))}
    //               </div>
    //             </SwiperSlide>
    //           ))}
    //         </Swiper>
    //       </div>
    //     )}

    //     {/*第三块： property介绍 */}
    //     <div className="property-description">
    //       <h2>Property Description</h2>
    //       <p>{property.description}</p>

    //       {bookings?.map((booking) => booking.id).includes(id) ? (
    //         <>
    //           <Button
    //             variant="outline"
    //             color="red"
    //             onClick={() => cancelBooking()}
    //             disabled={cancelling}
    //           >
    //             <span>Cancel Booking</span>
    //           </Button>
    //           <span>
    //             Your visit already booked for date{" "}
    //             {bookings?.filter((booking) => booking?.id === id)[0].date}
    //           </span>
    //         </>
    //       ) : (
    //         <button
    //           className="button"
    //           onClick={() => {
    //             validateLogin() && setModalOpened(true);
    //           }}
    //         >
    //           Book Your Visit
    //         </button>
    //       )}

    //       <BookingModal
    //         opened={modalOpened}
    //         setOpened={setModalOpened}
    //         propertyId={id}
    //         email={user?.email}
    //       />
    //     </div>
    //     {/* 第四块： property Overview */}
    //     <div className="property-overview">
    //       <h2>Proerty Overview</h2>
    //       <div className="overvew-items">
    //         <div className="overview-item">
    //           <i className="fa fa-bed"></i>
    //           <span>{property.facilities.bedrooms} Bedrooms</span>
    //         </div>
    //         <div className="overview-item">
    //           <i className="fa fa-bath"></i>
    //           <span>{property.facilities.bathrooms} bathrooms</span>
    //         </div>
    //         <div className="overview-item">
    //           <i className="fa fa-building"></i>
    //           <span>{property.facilities.parkings} Parkings</span>
    //         </div>
    //         {/* add more as need */}
    //       </div>
    //     </div>

    //     {/* 第五块：Feature & Amenities */}
    //     <div className="property-amenities">
    //       <h2>Feature & Amenities</h2>
    //       <div className="amenities-items">
    //         {property.amenities &&
    //           Object.entries(property.amenities).map(([key, value], index) => (
    //             <div key={index} className="amenities-item">
    //               <i className="fa fa-check"></i>
    //               <span>
    //                 {key}:{value}
    //               </span>
    //             </div>
    //           ))}
    //       </div>
    //     </div>
    //     {/* 第六块：地图 */}
    //     <div className="property-map">
    //       <h2>Location</h2>
    //       <iframe
    //         src={`https://www.google.ca/maps?q=${property.address}&output=embed`}
    //         width="100%"
    //         height="400%"
    //         style={{ border: 0 }}
    //         allowFullScreen=""
    //         tabIndex="0"
    //       ></iframe>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PropertyDetail;
