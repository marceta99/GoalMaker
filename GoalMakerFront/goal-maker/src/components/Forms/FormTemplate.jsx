import React from 'react'
import "./FormTemplate.css"; 

const TeamEditForm = () => {
  return (
    <div class="container">
    <header>Registration</header>

    <form action="#">
        <div class="form first">
            <div class="details personal">
                <span class="title">Personal Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your name" required></input>
                    </div>

                    <div class="input-field">
                        <label>Date of Birth</label>
                        <input type="date" placeholder="Enter birth date" required></input>
                    </div>

                    <div class="input-field">
                        <label>Email</label>
                        <input type="text" placeholder="Enter your email" required></input>
                    </div>

                    <div class="input-field">
                        <label>Mobile Number</label>
                        <input type="number" placeholder="Enter mobile number" required></input>
                    </div>

                    <div class="input-field">
                        <label>Gender</label>
                        <select required>
                            <option disabled selected>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <div class="input-field">
                        <label>Occupation</label>
                        <input type="text" placeholder="Enter your ccupation" required></input>
                    </div>
                </div>
            </div>

            <div class="details ID">
                <span class="title">Identity Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>ID Type</label>
                        <input type="text" placeholder="Enter ID type" required></input>
                    </div>

                    <div class="input-field">
                        <label>ID Number</label>
                        <input type="number" placeholder="Enter ID number" required></input>
                    </div>

                    <div class="input-field">
                        <label>Issued Authority</label>
                        <input type="text" placeholder="Enter issued authority" required></input>
                    </div>

                    <div class="input-field">
                        <label>Issued State</label>
                        <input type="text" placeholder="Enter issued state" required></input>
                    </div>

                    <div class="input-field">
                        <label>Issued Date</label>
                        <input type="date" placeholder="Enter your issued date" required></input>
                    </div>

                    <div class="input-field">
                        <label>Expiry Date</label>
                        <input type="date" placeholder="Enter expiry date" required></input>
                    </div>
                </div>

                <button class="nextBtn">
                    <span class="btnText">Next</span>
                    <i class="uil uil-navigator"></i>
                </button>
            </div> 
        </div>

        <div class="form second">
            <div class="details address">
                <span class="title">Address Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Address Type</label>
                        <input type="text" placeholder="Permanent or Temporary" required></input>
                    </div>

                    <div class="input-field">
                        <label>Nationality</label>
                        <input type="text" placeholder="Enter nationality" required></input>
                    </div>

                    <div class="input-field">
                        <label>State</label>
                        <input type="text" placeholder="Enter your state" required></input>
                    </div>

                    <div class="input-field">
                        <label>District</label>
                        <input type="text" placeholder="Enter your district" required></input>
                    </div>

                    <div class="input-field">
                        <label>Block Number</label>
                        <input type="number" placeholder="Enter block number" required></input>
                    </div>

                    <div class="input-field">
                        <label>Ward Number</label>
                        <input type="number" placeholder="Enter ward number" required></input>
                    </div>
                </div>
            </div>

            <div class="details family">
                <span class="title">Family Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Father Name</label>
                        <input type="text" placeholder="Enter father name" required></input>
                    </div>

                    <div class="input-field">
                        <label>Mother Name</label>
                        <input type="text" placeholder="Enter mother name" required></input>
                    </div>

                    <div class="input-field">
                        <label>Grandfather</label>
                        <input type="text" placeholder="Enter grandfther name" required></input>
                    </div>

                    <div class="input-field">
                        <label>Spouse Name</label>
                        <input type="text" placeholder="Enter spouse name" required></input>
                    </div>

                    <div class="input-field">
                        <label>Father in Law</label>
                        <input type="text" placeholder="Father in law name" required></input>
                    </div>

                    <div class="input-field">
                        <label>Mother in Law</label>
                        <input type="text" placeholder="Mother in law name" required></input>
                    </div>
                </div>

                <div class="buttons">
                    <div class="backBtn">
                        <i class="uil uil-navigator"></i>
                        <span class="btnText">Back</span>
                    </div>
                    
                    <button class="sumbit">
                        <span class="btnText">Submit</span>
                        <i class="uil uil-navigator"></i>
                    </button>
                </div>
            </div> 
        </div>
    </form>
</div>
  )
}

export default TeamEditForm; 