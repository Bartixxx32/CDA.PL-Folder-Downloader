# CDA.PL Folder Downloader
Program/Skrypt do pobierania całego folderu z cda.pl


Wymagania>

 - lynx<br>
 - nodejs
 - npm
 - screen
 - aria2c
 
  `sudo apt-get install lynx nodejs npm screen aria2c`
  <br>
  `git clone https://github.com/Bartixxx32/CDA.PL-Folder-Downloader`
  <br>
  `cd CDA.PL-Folder-Downloader`
  <br>
  `npm install`
## Jak używać
***Wersja Bash***:<br>
`npm install`<br>
`./cda_dl.sh "link"`
<br>
<br>Np: `./cda_dl.sh https://www.cda.pl/uzytkownik/folder/12345678` 
<br>
<br>***Wersja Docker***
 
    docker pull bartixxx32/cdapl-dl:latest ; docker run -it --rm -v "$PWD/Pobrane:/Pobrane" bartixxx32/cdapl-dl "link"
*Pobrane pliki znajdziemy w folderze Pobrane w aktualnej ścieżce* 



[![](https://images.microbadger.com/badges/image/bartixxx32/cdapl-dl.svg)](https://microbadger.com/images/bartixxx32/cdapl-dl "Badge")
