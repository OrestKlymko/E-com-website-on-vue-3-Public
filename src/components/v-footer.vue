<template>
  <footer>
    <div class="waves">
      <div class="wave" id="wave1"></div>
    </div>
    <ul class="social">
      <li>
        <a href="https://www.facebook.com/klymkoorest"
          ><ion-icon name="logo-facebook"></ion-icon
        ></a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/orest-klymko/"
          ><ion-icon name="logo-linkedin"></ion-icon
        ></a>
      </li>
      <li>
        <a href="https://www.instagram.com/klymko_orest/"
          ><ion-icon name="logo-instagram"></ion-icon
        ></a>
      </li>
    </ul>
    <p>©2023 by Orest Klymko | All Rights Reserved</p>
  </footer>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100vh;
}
footer {
  position: relative;
  width: 100%;
  padding: 20px 50px;
  background: #81aded;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}
footer .wave {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  background-size: 1000px 100px;
}
.social {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
}
.social li,
.menu li {
  list-style: none;
}
.social li a {
  font-size: 2em;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;
}
.menu li a {
  font-size: 1.2em;
  color: #fff;
  opacity: 0.75;
  margin: 0 15px;
  text-decoration: none;
  display: inline-block;
}
.menu li a:hover {
  opacity: 1;
}
footer p {
  color: #fff;
  text-align: center;
  margin-top: 15px;
  font-size: 1.1em;
}
</style>
