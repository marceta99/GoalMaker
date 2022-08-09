import React, { useEffect } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
import "./Login.css";  
const Login = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        
    },[])

  return (
    <div  className="body">
      <div style={{display:"flex"}}>
      <div class="container">
    <input type="checkbox" id="flip"></input>
    <div class="cover">
      <div class="front">
        <img src="https://imageio.forbes.com/specials-images/dam/imageserve/1073238044/960x0.jpg?format=jpg&width=960" alt=""></img>
        
      </div>
      <div class="back">
        <img class="backImg" src="https://fellow.app/wp-content/uploads/2020/10/Types-Company-Culture.jpg" alt=""></img>
        <div class="text">
          <span class="text-1">Complete miles of journey <br></br> with one step</span>
          <span class="text-2">Let's get started</span>
        </div>
      </div>
    </div>
    <div class="forms">
        <div class="form-content">
          <div class="login-form">
            <div class="title">Login</div>
          <form action="#">
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input type="text" placeholder="Enter your email" required></input>
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password" required></input>
              </div>
              <div class="text"><a href="#">Forgot password?</a></div>
              <div class="button input-box">
                <input type="submit" value="Sumbit" onClick={()=>{navigate("/home")}}></input>
              </div>
              <div class="text sign-up-text">Don't have an account? <label for="flip">Signup now</label></div>
            </div>
        </form>
      </div>
        <div class="signup-form">
          <div class="title">Signup</div>
        <form action="#">
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Enter your name" required></input>
              </div>
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input type="text" placeholder="Enter your email" required></input>
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password" required></input>
              </div>
              <div class="button input-box">
                <input type="submit" value="Submit" onClick={()=>{navigate("/home")}}></input>
              </div>
              <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
            </div>
      </form>
    </div>
    </div>
    </div>
      </div>
      </div>
    </div>
  )
}

export default Login