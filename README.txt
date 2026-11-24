SECRET HITLER — SYSTEM STACJI QR I SKLEPU WPLYWOW
=================================================

Paczka obsluguje wszystkie 3 podejscia do uruchomienia gry:

1. TRYB ONLINE (NETLIFY DROP / GITHUB PAGES — NAJPROSTSZY Z KAMERA HTTPS)
   - Przeciagnij rozpakowany folder na https://app.netlify.com/drop
   - Otrzymasz darmowy link HTTPS.
   - Na laptopie kliknij "ZALOZ POKOJ (LAPTOP)", a znajomi na telefonach wpisza kod pokoju.
   - Skaner kamery w przegladarce dziala bez zadnych ostrzezen.

2. TRYB OFFLINE W DOMOWYM WI-FI (LOKALNY SERWER PYTHON)
   - Windows: kliknij dwukrotnie "start_lan.bat" (lub uruchom: python server.py).
   - macOS/Linux: uruchom w terminalu: python3 server.py
   - Opcjonalnie z certyfikatem HTTPS: python3 server.py --https
   - Na laptopie wejdz na http://localhost:8000 i kliknij "USTAW JAKO LAPTOP (LAN)".
   - Znajomi w tym samym Wi-Fi wchodza na adres IP wyswietlony w konsoli (np. http://192.168.1.15:8000)
     i klikaja "DOLACZ JAKO GRACZ (LAN)".

3. SKANOWANIE NATYWNYM APARATEM TELEFONU (OBEJSCIE UPRAWNIEN KAMERY)
   - W zakladce USTAWIENIA / QR / SKLEP mozesz wpisac bazowy adres strony (np. adres z Netlify
     lub http://192.168.1.15:8000).
   - Wygenerowane 15 kodow QR zawiera wtedy bezposredni link z tajnym tokenem (?scan=TOKEN).
   - Gracz moze zeskanowac kod zwyklym aparatem w telefonie — otworzy sie strona i automatycznie
     zaliczy stacje dla zapamietanej sesji gracza.

FUNKCJE W SKLEPIE WPLYWOW (WSPOLNA PULA):
- Zawiera wszystkie 3 warianty Sladu Faszysty: Zawezenie, Opozniony oraz Gorace Stacje.
- W zakladce USTAWIENIA / QR / SKLEP mozesz wlaczac/wylaczac przedmioty, zmieniac ich ceny
  i limity sztuk we wspolnej puli oraz uzyc przycisku "LOSUJ SKLEP (ZBALANSOWANY)".
