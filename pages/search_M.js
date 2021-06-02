/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
// import { Search } from 'react-feather';
import axios from 'axios';
import checkoutPage from './checkout'
import API from '../cons/api';
import Link from 'next/link';
const customStyles = {
  option: (provided) => ({
    ...provided,
    borderBottom: '1px solid #ddd',
    padding: '0.65rem 1rem',
  }),
};

const SearchChara = () => {

  const [inputvalue, setInputvalue] = useState('');
  const [resultat, setResultat] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getResults = async () => {
      setLoading(true);



      const url = API(inputvalue);
      const response = await axios.get(url);
      const { results } = response.data.data;
      setLoading(false);
      const charachters = results.map((e) => ({
        name: e.name,
        image: e.thumbnail.path + "." + e.thumbnail.extension,
        description: e.description

      }));

      setResultat(charachters);

    };
    if (inputvalue.length > 0) { getResults(); }


  }, [inputvalue]
  );

  const searchOnchange = (event) => {
    setInputvalue(event.target.value);
  }

  return (
    <>

      <div className="bg-fixed min-h-screen"  style={{ background: "url('e4ec22a31fc5546b68b5ef001ca6372b.jpg')" , backgroundSize:"cover" ,  width: "100%"}}>
        <h1 className="w-1/3 mx-auto  text-center font-semibold text-dyc-red text-red-600">Purchase your favorite  </h1>
        <div className="w-1/3 mx-auto my-3">
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Iron man is the best !!!! " type="search" value={inputvalue} onChange={searchOnchange} />
        </div>

        <div className="flex flex-wrap  ">

          {

            inputvalue.length > 0 && resultat.map(x => (

              <div className="w-1/4 mx-12 my-5 p-10 rounded-lg  shadow-xs opacity-75 bg-gray-200">


                <img className="object-fill h-48 mx-auto rounded-full"  src={x.image} />
                <h1 className="text-lg text-center font-bold my-2">{x.name}  </h1>
                <hr />
                <h1 className=" text-center mx-auto text-sm my-4 italic">{x.description}</h1>
                <a className="inline-block border border-red-500 rounded py-1 px-3 bg-red-500 text-black mx-20" href="./checkout">Buy now </a>

              </div>

            )
            )
          }
        </div>
      </div>
    </>
  );

};




export default SearchChara;
