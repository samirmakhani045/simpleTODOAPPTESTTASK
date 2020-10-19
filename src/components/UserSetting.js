import React, { Component } from "react";
import { Field,  Formik } from 'formik';
import zxcvbn from 'zxcvbn';
import axios from 'axios'
class UserSetting extends Component {
    state = {
        activateTab: 1,
        email:'',
        password:'',
        passwordScore:0,
        confirmPassword:'',
        meeterColor:'red',
        meeterStatement:'Bad',
        fillMetterWidht:'25%',
        lastName:'',
        firstName:'',
        street:{
          line1 :'line1',
          line2 :'',
          houseNumber:'',
          postalCode:''
        },
        country :'Germany'
      };
      handleClick(i){
          this.setState({
              activateTab :i
          })
      }
      passwordChange(e) {
        let score= zxcvbn(e.target.value).score
        if(score === 0 ||  score === 1){
          this.setState({meeterColor :'red' ,meeterStatement :'Bad',fillMetterWidht :'25%'})

        }else if(score === 2){
          this.setState({meeterColor :'oreange',meeterStatement :'week',fillMetterWidht :'50%'})
        }else if(score ===3){
          this.setState({meeterColor :'yellow',meeterStatement :'Good',fillMetterWidht :'75%'})
        }else{
          this.setState({meeterColor :'green',meeterStatement :'Excellent',fillMetterWidht :'100%'})
        }
      }

       saveData(){
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
       axios.post(apiUrl,{
        title: this.state.lastName,
        body: this.state.firstName,
        userId: 1,
      }).then((repos) => {
          const allRepos = repos.data;
          if(repos.status === 200 || repos.status === 201){
            alert("Data is saved in database")

          }else{
            alert("Something went wrong!")
          }

        });
      }
      


render() {    
  return (
    <header style={{justifyContent :'center'}}>
        <div className="mobile-continer"  style={{
            width:504,
            maxWidth:'70%',
            marginLeft:'auto',
            marginRight:'auto',
            marginTop:24,
            marginBottom:24,
            backgroundColor:'#ffffff'
        }}>
        <div
        >
            <button 
            onClick={() => this.handleClick(1)}
            style={{backgroundColor :this.state.activateTab === 1?  '#272E71' :'#ffffff',
            color :this.state.activateTab === 1?   '#ffffff' :'#272E71'

         }}  className="button" >Account Settings</button>
            <button 
            onClick={() => this.handleClick(2)}
            style={{backgroundColor :this.state.activateTab === 2?  '#272E71' :'#ffffff',
            color :this.state.activateTab === 2?   '#ffffff' :'#272E71'}}
            className="button">User Information</button>
        </div>
        {this.state.activateTab  === 1? 
        <Formik
        className="customizeForm"
        initialValues={{ email: this.state.email, password: this.state.password ,confirmpassword: this.state.confirmPassword }}
        validate={values => {
           const errors = {};
          if (!values.email) {
            errors.email = 'Required';
            
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } else{

          }
   
         if(!values.password) {
            errors.password = 'Required';
         }else if (values.password.length <8){
            errors.password = 'password must be at least 8 characters';                 
          } 

          if(!values.confirmpassword) {
            errors.confirmpassword = 'Required';
         }else if (values.confirmpassword.length <8){
            errors.confirmpassword = 'password must be at least 8 characters';                 
          }else if (values.confirmpassword !== values.password){
            errors.confirmpassword = 'password does not match';
          }
            return errors;
        }}
        
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form  className="customizeForm" onSubmit={handleSubmit}>
            <label style={{marginTop:24}} >Enter Email Address</label>  
            <input
            className="InputStyle"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              style={{
                borderColor:errors.email ? 'red' :'#616161'
              }}
  
            />
            <label style={{color:'red'}}>
                {errors.email && touched.email && errors.email}
            </label>

            <label style={{marginTop:24}} >Enter Password</label>  

            <input
            style={{
              borderColor:errors.password ? 'red' :'#616161'
            }}
              className="InputStyle"
              type="password"
              name="password"
              onChange={
                (e) => {
                  handleChange(e)
                  this.passwordChange(e)
                }
              }
              onBlur={handleBlur}
              value={values.password}
            />
            <label style={{color:'red'}}>
                {errors.password && touched.password && errors.password}
            </label>
            {values.password ? 
            <div>
            <label>{this.state.meeterStatement}</label>
            <div
          style={{
              width:200,
              height:4,
              backgroundColor:'#cccccc'
          }}>
            <div 
              style={{
                  height:4,
                  backgroundColor:this.state.meeterColor,
                  width:this.state.fillMetterWidht
              }}
            ></div>
          </div>
          </div>            
            :null }
                        <label style={{marginTop:24}} >Enter Confirm Password</label>  
            <input
            style={{
              borderColor:errors.confirmpassword ? 'red' :'#616161'
            }}
              className="InputStyle"
              type="password"
              name="confirmpassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmpassword}
            />
            <label style={{color:'red'}}>
                {errors.confirmpassword && touched.confirmpassword && errors.confirmpassword}
            </label>

            <button type="submit" style={{
                marginTop:24
            }} disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
        :
        <Formik
        className="customizeForm"
        initialValues={{ firstName: this.state.firstName, lastName: this.state.lastName ,
          line1 :this.state.street.line1 ,line2 :this.state.street.line2, country :this.state.country,
          houseNumber:this.state.street.houseNumber,postalCode:this.state.street.postalCode
        
        }}
        validate={values => {
          const errors = {};
            return errors;
        }}        
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            this.saveData();  

            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form  className="customizeForm" onSubmit={handleSubmit}>
            <label style={{marginTop:24}} >Enter first name</label>  
            <input
            className="InputStyle"
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              style={{
                borderColor:errors.firstName ? 'red' :'#616161'
              }}
  
            />
            <label style={{marginTop:24}} >Enter Last name</label>
            <input
            style={{
              borderColor:errors.lastName ? 'red' :'#616161'
            }}
              className="InputStyle"
              type="text"
              name="lastName"
              onChange={
                (e) => {
                  handleChange(e)
                  this.passwordChange(e)
                }
              }
              onBlur={handleBlur}
              value={values.lastName}
            />
            <label style={{marginTop:24 ,fontSize:24}} >Enter address</label>
            <label style={{marginTop:40 }} >Line1</label>
            <input
            style={{
              borderColor:errors.line1 ? 'red' :'#616161'
            }}
              className="InputStyle"
              type="text"
              name="line1"
              onChange={
                (e) => {
                  handleChange(e)
                  this.passwordChange(e)
                }
              }
              onBlur={handleBlur}
              value={values.line1}
            />

            <label style={{marginTop:24 }} >Line2</label>
            <input
            style={{
              borderColor:errors.line2 ? 'red' :'#616161'
            }}
              className="InputStyle"
              type="text"
              name="line2"
              onChange={
                (e) => {
                  handleChange(e)
                  this.passwordChange(e)
                }
              }
              onBlur={handleBlur}
              value={values.line2}
            />
        <div style={{display:'flex',
        placeContent:'space-between',
        flexDirection:'row'}}>
          <div style={{display:'flex',
        flexDirection:'column',
        width:'48%'}} >
          <label style={{marginTop:24 }} >House number</label>
            <input
            style={{
              borderColor:errors.houseNumber ? 'red' :'#616161'
            }}
              className="InputStyle"
              type="text"
              name="houseNumber"
              onChange={
                (e) => {
                  handleChange(e)
                  this.passwordChange(e)
                }
              }
              onBlur={handleBlur}
              value={values.houseNumber}
            />
          </div>
          <div style={{display:'flex',
        flexDirection:'column',
        width:'48%'}} >
          <label style={{marginTop:24 }} >Postatl code</label>
            <input
            style={{
              borderColor:errors.postalCode ? 'red' :'#616161'
            }}
              className="InputStyle"
              type="text"
              name="postalCode"
              onChange={
                (e) => {
                  handleChange(e)
                  this.passwordChange(e)
                }
              }
              onBlur={handleBlur}
              value={values.postalCode}
            />
          </div> 
        </div>
            <label style={{marginTop:24}} >Select country</label>
            <Field component="select" as="select" name="country">
             <option defaultValue value="Germany">Germany</option>
             <option value="Austria">Austria</option>
             <option value="Switzerland">Switzerland</option>
           </Field>

            <button type="submit" style={{
                marginTop:24
            }} disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>

        }
        </div>
    </header>
  )
}
}

export default UserSetting