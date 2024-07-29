import LogosPage from '../components/LogosPage/LogosPage';

const Brands = () => {
  const tabs = [
    { key: 'restaurant', label: 'Restaurant', imgURL: 'restaurants.jpg' },
    { key: 'entertainment', label: 'Entertainment', imgURL: 'restaurants.jpg' },
    { key: 'retail', label: 'Retail', imgURL: 'restaurants.jpg' },
  ];

  return (
    <div className="brand-page-container">
      <LogosPage title="Brand" imgURL={tabs[0].imgURL} tabs={tabs} />
    </div>
  );
};

export default Brands;
