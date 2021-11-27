import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "./responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useRef} from 'react';
import { useNavigate } from "react-router";
const Container = styled.div`
  height: 60px;
  display:flex;
  align-items:center;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  // margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-family:Roboto Mono;
  color:goldenrod;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  color:black;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const search=useRef();
  const navigate =useNavigate();
  const user = useSelector(state=>state.user.currentUser);
  const quantity = useSelector(state=>state.cart.quantity);
  const searchProduductCategory=(e)=>{
    e.preventDefault();
    if(search.current.value===""){
      search.current.value=null;
    }
    navigate("/products/"+search.current.value);
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}
          <SearchContainer>
            <Input placeholder="Search"  ref={search}/>
            <Search style={{ color: "gray", fontSize: 16 }} onClick={searchProduductCategory}/>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>DIGISHOP</Logo>
        </Center>
        <Right>
          <Link to="/register">
          <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login">
            {!user?._id?<MenuItem>SIGN IN</MenuItem>:<MenuItem>LOGOUT</MenuItem>
            }
          </Link>
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;