import styled from "styled-components";
import { mobile } from "../components/responsive";
import {Link} from 'react-router-dom';
import api from './regApi.js';
import { useRef } from "react";
import {useNavigate} from 'react-router';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  font-family:Roboto Mono
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius:5px;
  font-size:20px;
  font-weight:500
`;

const Register = () => {
  const usernameref=useRef();
  const emailref=useRef();
  const passwordref=useRef();
  const confirmpasswordref=useRef();
  const navigate=useNavigate();
  const handleClick=async (e)=>{
    e.preventDefault();
    if(passwordref.current.value!==confirmpasswordref.current.value){
      alert("PASSWORD NOT MATCHING");
      return;
    }
    else{
      try{
        await api.post("/auth/register",{
          username:usernameref.current.value,
          password:passwordref.current.value,
          email:emailref.current.value
        });
        navigate('/login');
        // console.log(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="ENTER USERNAME" ref={usernameref}/>
          {/* <Input placeholder="username" /> */}
          <Input placeholder="ENTER EMAIL" ref={emailref}/>
          <Input placeholder="ENTER PASSWORD" ref={passwordref}/>
          <Input placeholder="CONFIRM PASSWORD" ref={confirmpasswordref}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Link to="/login" style={{textDecoration:'none',fontSize:'18.0px',color:'purple',margin:'2px 0'}}>Already have an account?</Link>
          <Button onClick={handleClick}>R E G I S T E R</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;