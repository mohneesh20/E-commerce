import { useState,useEffect } from "react";
import styled from "styled-components";
import { login,Logout } from "../redux/apiCalls";
import { mobile } from "../components/responsive";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router";
import { userRequest } from "../requestMethods";
import { current } from "immer";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
  border-radius:5px;
  font-size:20px;
  font-weight:500;
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 15px;
//   // text-decoration: underline;
//   cursor: pointer;
// `;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { isFetching, error,currentUser} = useSelector((state) => state.user);
  const { products,quantity,total} = useSelector((state) => state.cart);
  useEffect(()=>{
    const postCartsInDb=async ()=>{
      const postCart={userId:currentUser._id,products,quantity,total};
      try{
        // console.log(currentUser.accessToken);
        const res=await userRequest.put("/carts/"+currentUser._id,postCart);
        if(res.status===200){
          Logout(dispatch);
          navigate("/");
        }
      }
      catch(err){        
        console.log(err);
      }
    }
    if(currentUser){
      postCartsInDb();
      return;
    }
  },[])
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    navigate('/');
    // window.location.reload();
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            L O G I N
          </Button>
          {error && <Error>Something went wrong...</Error>}
          {/* <Link to='/'>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Link to="/register" style={{textDecoration:'none',fontSize:'20px',color:'black'}}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;