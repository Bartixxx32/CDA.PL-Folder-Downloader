file=$(mktemp temp.XXXXXXXXX)
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' >> $file
youtube-dl -a $file -f best -o "Pobrane/%(title)s.%(ext)s" --external-downloader aria2c --external-downloader-args '-c -j 10 -x 3 -s 3 -k 1M'
rm -r $file
