file=$(mktemp temp.XXXXXXXXX)
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' | sort | uniq >> $file
yt-dlp -ciw -a $file -o "Pobrane/%(title)s.%(ext)s" --external-downloader aria2c --external-downloader-args '-c -j 10 -x 3 -s 3 -k 1M'
rm -r lista.txt
rm -r $file