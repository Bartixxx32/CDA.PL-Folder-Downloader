

# CDA.PL-Folder-Downloader
Możesz użyć tego skryptu aby pobrać cały folder z cda.pl


Wymagania:

 - Lynx<br>
 - YouTube-DL
## Jak używać
***Wersja Bash***:
<br>
`./cda_dl.sh "link" "ścieżka"`
<br>Np: `./cda_dl.sh https://www.cda.pl/uzytkownik/folder/12345678 ./Pobrane` 
<br>
<br>***Wersja Docker***

    docker pull bartixxx32/cdapl-dl:latest 
    docker run -it bartixxx32/cdapl-dl "link"
*Pobrane pliki znajdziemy w folderze Pobrane w aktualnej ścieżce*

