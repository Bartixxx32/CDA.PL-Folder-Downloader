
# CDA.PL Folder Downloader
Program/Skrypt do pobierania całego folderu z cda.pl


Wymagania

 - lynx<br>
 - aria2c
 
  `sudo apt-get install lynx aria2`
  <br>
  `git clone https://github.com/Bartixxx32/CDA.PL-Folder-Downloader`
  <br>
  `cd CDA.PL-Folder-Downloader`
  <br>
## Jak używać
***Wersja Bash***:<br>
`./cda_dl.sh "link"`
<br>
<br>Np: `./cda_dl.sh https://www.cda.pl/uzytkownik/folder/12345678` 
<br>Jeżeli folder posiada kilka stron, skrypt należy uruchomić dla każdej strony:
<br>Np: `./cda_dl.sh https://www.cda.pl/uzytkownik/folder/12345678/2`
<br>
<br>***Wersja Docker***
 
    docker pull bartixxx32/cdapl-dl:latest ; docker run -it --rm -v "$PWD/Pobrane:/app/Pobrane" bartixxx32/cdapl-dl "link"
*Pobrane pliki znajdziemy w folderze Pobrane w aktualnej ścieżce* 



[![](https://images.microbadger.com/badges/image/bartixxx32/cdapl-dl.svg)](https://microbadger.com/images/bartixxx32/cdapl-dl "Badge")

