import React from 'react';

import ProductFilter from './components/ProductFilter';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline mb-4">
        Freestyle Collection
      </h1>
      <p>
        Carve up any slope with our complete range of freestyle snowboards,
        featuring cutting-edge materials and industy-first innovations. With a
        wide range of cambers and tapers to suit any taste and experience level,
        you'll find the right board for bunny-hill drifters and veteran
        shredders alike.
      </p>
      <ProductFilter />
    </div>
  );
};

export default App;
