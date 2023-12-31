import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import styled from "styled-components";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import axios from "axios";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media screen and (max-width: 768px) {
    h1{
      font-size: 1.3em;
    }
  }
  @media screen and (max-width: 300px) {
   h1{
    font-size: 0.8em;
   }
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px 0;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  `;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select{
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
  @media screen and (max-width: 768px) {
    display: block;
    width: 110px;
    height: 15px;
    font-size: 0.5em;
  }
`;

export default function CategoryPage({
  category, subCategories, products:originalProducts, wishedProducts
}) {
  const defaultSorting = '_id-desc';
  const defaultFilterValues = category.properties.
    map(p => ({name:p.name,value:"all"}));
  const [products, setProducts] = useState(originalProducts);
  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);
function handleFilterChange(filterName, filterValue){
  setFilterValues(prev => {
    return prev.map(p => ({
      name: p.name,
      value: p.name === filterName ? filterValue : p.value,
    }));
  }); 
  setFiltersChanged(true);
}
useEffect(() => {
  if (!filtersChanged) {
    return;
  }
  setLoadingProducts(true);
  const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
  const params = new URLSearchParams;
  params.set('categories', catIds.join(','));
  params.set('sort', sort);
  filterValues.forEach(f => {
    if (f.value !== 'all') {
      params.set(f.name, f.value);
    }
  });
  const url = '/api/products?' + params.toString();
  axios.get(url).then(res => {
    setProducts(res.data);
    setLoadingProducts(false);
  })
},[filterValues, sort, filtersChanged]); 
  return (
    <>  
      <Header/>
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>
          <FilterWrapper>
            {category.properties.map(prop => (
              <Filter key={prop.name}>
                <span>{prop.name}:</span>
                <select
                  onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                  value={filterValues.find(f => f.name === prop.name).value}>
                  <option value="all">All</option>
                  {prop.values.map((val, index) => (
                    <option key={index} value={val}>{val}</option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>sort:</span>
              <select 
                value={sort} 
                onChange={ev => {
                  setSort(ev.target.value); 
                  setFiltersChanged(true);
                }}>
                <option value="price-asc">price - lowest first</option>
                <option value="price-desc">price - highest first</option>
                <option value="_id-desc">newest first</option>
                <option value="_id-asc">oldest first</option>
              </select>
            </Filter>
          </FilterWrapper>
        </CategoryHeader>
        {loadingProducts && (
          <Spinner fullwidth={1} />
        )}
        {!loadingProducts && (
          <div>
            {products.length > 0 && (
              <ProductsGrid products={products} wishedProducts={wishedProducts} />
            )}
            {products.length === 0 && (
              <div>Sorry, no products found.</div>
            )}
          </div>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({parent: category._id});
  const catIds = [category._id, ...subCategories.map(c => c._id)];
  const products = await Product.find({category: catIds});
  const wishedProducts = session?.user
  ? await WishedProduct.find({
    userEmail:session?.user.email,
    product: products.map(p => p._id.toString()),
})
  : [];
  return{
    props: {
        category: JSON.parse(JSON.stringify(category)),
        subCategories: JSON.parse(JSON.stringify(subCategories)),
        products: JSON.parse(JSON.stringify(products)),
        wishedProducts: wishedProducts.map(i => i.product.toString()),
    }
  };
}
