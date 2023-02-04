function SignOut() {
    localStorage.removeItem("token");
    // redirect to sign in page
    window.location.href = "/sign-in";
  
}

export default SignOut;