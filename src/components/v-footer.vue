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
    <p>©2023 Orest Klymko | All Rights Reserved</p>
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
  margin: 0; /*обнуление отступов*/
  padding: 0; /*обнуление полей*/
  box-sizing: border-box; /*метод расчета размеров бокса*/
  font-family: "Poppins", sans-serif; /*название шрифта*/
}
body {
  display: flex; /*флексбокс сетка*/
  flex-direction: column; /*направление главной оси*/
  justify-content: flex-end; /*элементы в конце контейнера*/
  min-height: 100vh;
}
footer {
  position: relative; /*относительное позиционирование*/
  width: 100%; /*на всю ширину*/
  padding: 20px 50px; /*поля для контента*/
  background: #81aded; /*цвет футера*/
  display: flex;
  justify-content: center; /*в центре по горизонтали*/
  align-items: center; /*в центре по вертикали*/
  flex-direction: column;
  margin-top: 100px; /*отступ сверху*/
}
footer .wave {
  position: absolute; /*абсолютное позиционирование*/
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  /* background: url(wave.png); картинка волны */
  background-size: 1000px 100px; /*ширина и высота волны*/
}
.social {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap; /*разрешен перенос на новую строку*/
}
.social li,
.menu li {
  list-style: none; /*удалить черные маркеры*/
}
.social li a {
  font-size: 2em; /*размер иконок*/
  color: #fff; /*цвет иконок*/
  margin: 0 10px;
  display: inline-block; /*отображать как строчно-блочный элемент*/
  transition: 0.5s; /*плавный переход*/
}
.menu li a {
  font-size: 1.2em; /*размер ссылок меню*/
  color: #fff; /*цвет ссылок меню*/
  opacity: 0.75; /*значение прозрачности*/
  margin: 0 15px;
  text-decoration: none; /*ссылка без подчеркивания*/
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
