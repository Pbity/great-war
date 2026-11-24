# Secret Hitler // System Stacji QR

Aplikacja webowa wspomagajaca rozgrywke w fizycznego **Secret Hitlera** na domowce bez Mistrza Gry. Laczy klasyczne 3 plansze gry z 15 stacjami QR rozwieszonymi w mieszkaniu, dwufazowym timerem rundy (*Prace Domowe* -> *Dyskusja*), anonimowym **Sklepem Wplywow** oraz buforowanymi eliminacjami.

## Najwazniejsze funkcje

* **Obsluga 3 plansz Secret Hitlera:** 5–6, 7–8 oraz 9–10 graczy (automatyczne moce prezydenckie i zasady podgladu wspolnikow przez Hitlera).
* **15 stacji QR bez kodow PIN:** kazdy kod QR zawiera losowy token — gracze musza fizycznie podejsc i zeskanowac kartke aparatem telefonu. Opisy lokalizacji zapisuja sie w przegladarce, a wbudowany widok druku generuje gotowa siatke 15 kartek.
* **Dwufazowy timer rundy:** automatyczne przejscie z fazy *Prace Domowe* (skanowanie QR) do *Dyskusji* (QR zablokowane) z sygnalem dzwiekowym.
* **Sklep Wplywow:** gracze zdobywaja Punkty Wplywu za skanowanie przydzielonej stacji i moga anonimowo kupowac: *Tajny +1 Glos*, *Raport Aktywnosci*, *Sabotaz Stacji*, *Tarcze Ochronna* oraz (wylacznie zwykli Faszysci, 1x na gre) *Tajny Zamach*.
* **Eliminacje:** losowa jednorazowa *Ukryta Bron* w jednej z 15 stacji QR, *Tajny Zamach* Faszystow (oba trafiaja do bufora i sa blokowane przez Tarcze) oraz reczny przycisk **Egzekucja** na ekranie laptopa pod 4. i 5. ustawe faszystowska.
* **Synchronizacja Online (PeerJS WebRTC) + Tryb Testowy:** dziala na statycznym hostingu (GitHub Pages) bez stawiania wlasnego serwera.


## Jak przeprowadzic rozgrywke

1. **Przed gra:** Otworz strone na laptopie, uruchom pokoj (lub Tryb Testowy), wejdz w zakladke **15 Stacji QR**, wpisz opisy miejsc w domu i kliknij **Drukuj 15 Kodow QR**. Rozwies kartki na widoku.
2. **Dolaczanie:** Na laptopie kliknij **Utworz Pokoj Online**. Znajomi skanuja aparatem kod QR z ekranu laptopa i wpisuja swoje imiona.
3. **Start:** Kliknij **Rozpocznij Gre i Wylosuj Role**. Kazdy sprawdza swoja role w zakladce **Akta** na telefonie.
4. **Runda:** Uruchom **Start: Prace Domowe** — gracze chodza po domu, skanuja przydzielona stacje i wydaja Punkty Wplywu w Sklepie. Po przejsciu do **Dyskusji** rozlicz bufor eliminacji, wybierz rzad i przeprowadz glosowanie oraz fizyczne uchwalanie ustaw na planszy *Secret Hitlera*.
