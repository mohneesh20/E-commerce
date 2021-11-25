import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../components/responsive";
import { useState } from "react";
import { useParams } from "react-router";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  font-size:50px;
  color:goldenrod
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  background:transparent;
  border:2px solid goldenrod;
  color:goldenrod;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const {category}=useParams();
  // console.log(category);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  // console.log(filters);
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>FILTER PRODUCTS:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>COLOUR</Option>
            <Option>WHITE</Option>
            <Option>BLACK</Option>
            <Option>RED</Option>
            <Option>BLUE</Option>
            <Option>YELLOW</Option>
            <Option>GREEN</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>SIZE</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>SORT PRODUCTS:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">NEWEST</Option>
            <Option value="asc">PRICE(low to high)</Option>
            <Option value="desc">PRICE(high to low)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;