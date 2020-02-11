file="cdafolder.txt"
if [ -f $file ] ; then
    rm $file
fi
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' >> $file
youtube-dl -a $file -f best -o "Pobrane/%(title)s.%(ext)s" --external-downloader-args '-c -j 10 -x 3 -s 3 -k 1M'
rm -r $file
