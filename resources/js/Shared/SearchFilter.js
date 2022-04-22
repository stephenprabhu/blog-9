import { usePage } from '@inertiajs/inertia-react';
import React, {useState, useEffect} from 'react';
import pickBy from 'lodash/pickBy';
import { usePrevious } from 'react-use';
import { Inertia } from '@inertiajs/inertia';
import SelectInput from './SelectInput';

const SearchFilter = (props) => {
    const { filters } = usePage().props;
    const {extraOptions}= props;
    const [opened, setOpened] = useState(false);

    const [values, setValues] = useState({
        search: filters.search || '',
        status: filters.status || ''
      });

    const prevValues = usePrevious(values);

      function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
          ...values,
          [key]: value
        }));

        if (opened) setOpened(false);
      }

      function reset() {
        setValues({
          search: '',
          status:'all'
        });
      }

      useEffect(()=>{
        if(prevValues){
            const query = Object.keys(pickBy(values)).length
            ? pickBy(values) : {remember:'forget'};
            Inertia.get(route(route().current()), query,{
                replace:true,
                preserveState:true
            });
        }
      }, [values]);


  return (
    <div className="flex items-center w-full max-w-md mr-4 lg:mb-0 mb-4">
        <div className="relative flex w-full bg-white rounded shadow">
        {extraOptions && <>
            <div
          style={{ top: '100%' }}
          className={`absolute ${opened ? '' : 'hidden'}`}
        >
            <div
            onClick={() => setOpened(false)}
            className="fixed inset-0 z-20 bg-black opacity-25"
          ></div>
        <div className="relative z-30 w-64 px-4 py-6 mt-2 bg-white rounded shadow-lg">
            <SelectInput
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </SelectInput>
        </div>

        </div>
        <button
          onClick={() => setOpened(true)}
          className="px-4 border-r rounded-l md:px-6 hover:bg-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-indigo-400 focus:z-10"
        >
          <div className="flex items-baseline">
            <span className="hidden text-gray-700 md:inline">Filter</span>
            <svg
              className="w-2 h-2 text-gray-700 fill-current md:ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 961.243 599.998"
            >
              <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
            </svg>
          </div>
        </button>
        </>}

            <input
            className="relative w-full px-6 py-3 rounded-r focus:outline-none focus:ring-2 focus:ring-indigo-400"
            autoComplete="off"
            type="text"
            name="search"
            value={values.search}
            onChange={handleChange}
            placeholder="Search…"
            />
        </div>
        <button
            onClick={reset}
            className="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
            type="button"
        >
        Reset
      </button>
    </div>
  )
}

export default SearchFilter
