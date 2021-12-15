import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import ProductList from "../../components/ProductList";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import {mobile} from "../../styles/responsive";
import styled from "styled-components";
import {useState} from "react";
import {useRouter} from 'next/router'
import {categories} from "../../data";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({width: "0px 20px", display: "flex", flexDirection: "column"})}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight: "0px"})}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin: "10px 0px"})}
`;
const Option = styled.option``;

const Products = ({data}) => {
  const router = useRouter()
  const {category} = router.query
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Title>{category.toLocaleUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <ProductList data={data} category={category} filters={filters} sort={sort}/>
      <Newsletter/>
      <Footer/>
    </Container>
  );
};

export default Products;

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((c) => ({
    params: {category: c.category},
  }))

  return {paths, fallback: 'blocking'}
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
}

// This also gets called at build time
export async function getStaticProps({params}) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:5000/api/products?category=${params.category}`)
  const data = await res.json()

  // Pass post data to the page via props
  return {props: {data}}
}