import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../../pages/Main/Main';
import Details from '../../pages/Details/Details';
import NotFound from '../../pages/NotFound/NotFound';

const Content: React.FC = () => {

  return <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:base/:quote" element={<Main />} />
      <Route path="/:base/:quote/details" element={<Details />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
}

export default Content;