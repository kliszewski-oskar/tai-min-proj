function init() {
  var nakladka, i;
  
  nakladka = document.getElementsByClassName("nakladka");
  for (i = 0; i < nakladka.length; i++) {
    porownanie(nakladka[i]);
  }
   function porownanie(zdjecie) {
    var suwak, zdjecie, nacisk = 0, w, h;

    w = zdjecie.offsetWidth;
    h = zdjecie.offsetHeight;    //wprowadzenie szerokosci i wysokosci zdjecia

    zdjecie.style.height = (h / 2) + "px";    //ustawienie szerokosci 2x mniejszej

    suwak = document.createElement("DIV");
    suwak.setAttribute("class", "suwak");    //utworzenie przesuwaka/slidera:

    zdjecie.parentElement.insertBefore(suwak, zdjecie);    //wstawienie przesuwaka

    suwak.style.top = (h / 2) - (suwak.offsetHeight / 2) + "px";
    suwak.style.left = (w / 2) - (suwak.offsetWidth / 2) + "px";    //ustawienie pozycji suwaka na srodek

    suwak.addEventListener("mousedown", suwakStart);    //wykonanie funkcji gdy przycisk myszy jest nacisniety
    window.addEventListener("mouseup", suwakKoniec);    //wykonanie funkcji gdy przycisk myszy jest zwolniony

    function suwakStart(e) {
      e.preventDefault();
      nacisk = 1;      //ustawienie mozliwosci suwaka do poruszania sie
      window.addEventListener("mousemove", suwakRuch);      //wykonaj funkcje kiedy przesuwak sie rusza
    }
    function suwakKoniec() {
      nacisk = 0;      //zakonczenie mozliwosci suwaka do poruszania sie
    }
    function suwakRuch(e) {
      var pozycja;
    
    if (nacisk == 0){
      return false;
    } //jezeli slider nie jest "uzywany" - zakoncz

      pozycja = pozycjaKursor(e)      //"wydobycie" pozycji x kursora

      if (pozycja < 0) pozycja = 0;
      if (pozycja > h) pozycja = h;      //kod ktory uniemozliwia suwakowi przejsc przez granice zdjecia (wyjsc poza zdjecie)
      slide(pozycja);
    }
    function pozycjaKursor(e) {
      var a, y = 0;
      a = zdjecie.getBoundingClientRect();      //wyciagniecie pozycji x'a ze zdjecia
      y = e.pageY - a.left;      //obliczenie gdzie ma znajdywac sie x
      return y;
    }
    function slide(y) {
      zdjecie.style.height = y + "px";      //zmiana wielkosci zdjecia
      suwak.style.top = zdjecie.offsetHeight - (suwak.offsetHeight / 2) + "px";      // zmiana pozycji suwaka
    }
  }
}