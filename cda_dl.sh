file="cdafolder.txt"
if [ -f $file ] ; then
    rm $file
fi
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' >> $file
youtube-dl -a $file -f best
rm -r $file
