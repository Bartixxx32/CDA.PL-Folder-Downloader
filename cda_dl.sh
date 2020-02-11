file="cdafolder.txt"
if [ -f $file ] ; then
    rm $file
fi
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' >> $file
youtube-dl -a $file -f best -o "./Pobrane/%(title)s.%(ext)s"
rm -r $file
