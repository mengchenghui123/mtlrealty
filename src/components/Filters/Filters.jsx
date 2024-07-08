import { Form } from 'react-router-dom'
import FormSelect from '../FormSelect.jsx/FormSelect';
import './Filters.css'

const Filters = () => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <Form className='col-12 filters-container mb-3 row align-items-end justify-content-center' style={{ border: '1px solid blue' }}>
          <div className='col-12 col-md-4 mb-2 mb-md-0' style={{ border: '1px solid red' }}>
            <FormSelect
              label='SORT BY TYPE:'
              name='type'
              list={['House', 'Condo', 'Loft', 'Plex', 'Lot']}
            />
          </div>
          <div className='col-12 col-md-4 mb-2 mb-md-0' style={{ border: '1px solid red' }}>
            <FormSelect
              label='NEIGHBORHOOD:'
              name='neighborhood'
              list={['Montréal', 'Laval', 'Verdun', 'Brossard', 'Ville-Marie', 'Longueuil', 'Mont-Royal']}
            />
          </div>
          <div className='col-12 col-md-4 mb-2 mb-md-0 d-flex justify-content-center' style={{ border: '1px solid red' }}>
            <button type='submit' className="btn btn-dark btn-block">Search</button>
          </div>
        </Form>
      </div >
    </div >
  );
};
export default Filters;