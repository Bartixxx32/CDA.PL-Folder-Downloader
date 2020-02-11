
# CDA.PL-Folder-Downloader
Możesz użyć tego skryptu aby pobrać cały folder z cda.pl


Wymagania:

 - Lynx<br>
 - YouTube-DL
## Jak używać
***Wersja Bash***: `./cda_dl.sh "link" "ścieżka"`
Np: `./cda_dl.sh https://www.cda.pl/uzytkownik/folder/12345678 ./Pobrane` 
***Wersja Docker***

    docker pull bartixxx32/cdapl-dl:latest 
    docker run -it bartixxx32/cdapl-dl "link"
Pobrane pliki znajdziemy w folderze Pobrane w aktualnej ścieżce

