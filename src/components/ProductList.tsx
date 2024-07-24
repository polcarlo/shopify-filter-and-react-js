import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="flex flex-col">
      {products.map(({ node }) => (
        <div key={node.id} className="flex mb-4 border p-4 rounded shadow-md">
          {node.images.edges.length > 0 &&
            node.images.edges[0].node.transformedSrc && (
              <img
                src={node.images.edges[0].node.transformedSrc}
                alt={node.images.edges[0].node.altText || 'Product Image'}
                className="w-32 h-32 object-cover mr-4"
              />
            )}
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-2">{node.title}</h2>
            <div
              className="text-gray-600 mb-2"
              dangerouslySetInnerHTML={{ __html: node.descriptionHtml }}
            />
            <p className="text-lg font-bold">
              ${node.variants.edges[0].node.price.amount}{' '}
              {node.variants.edges[0].node.price.currencyCode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
