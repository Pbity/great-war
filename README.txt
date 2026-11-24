SECRET HITLER // STACJE QR — SYSTEM ZARZĄDZANIA ROZGRYWKĄ
=========================================================

Paczka obsługuje 3 tryby uruchomienia:

1. TRYB ONLINE (NETLIFY DROP / GITHUB PAGES — HTTPS)
   - Przeciągnij rozpakowany folder na https://app.netlify.com/drop
   - Na laptopie kliknij "ZAŁÓŻ POKÓJ", a znajomi na telefonach wpiszą kod pokoju.

2. TRYB OFFLINE W DOMOWYM WI-FI (SERWER PYTHON)
   - Windows: uruchom "start_lan.bat" (lub: python server.py)
   - macOS/Linux: uruchom "start_lan.sh" (lub: python3 server.py)
   - Z certyfikatem HTTPS: python3 server.py --https
   - Laptop: http://localhost:8000 -> "USTAW LAPTOP"
   - Telefony: adres IP z konsoli -> "DOŁĄCZ LAN"

3. SKANOWANIE NATYWNYM APARATEM TELEFONU (?scan=TOKEN)
   - W zakładce USTAWIENIA / QR / SKLEP wpisz bazowy adres strony.
   - Wydrukowane 15 kodów QR będzie zawierało linki ?scan=TOKEN, które można
     skanować zwykłym aparatem telefonu bez uprawnień kamery w przeglądarce.
